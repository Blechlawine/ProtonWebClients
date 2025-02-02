import { c } from 'ttag';

import { itemBuilder } from '@proton/pass/lib/items/item.builder';
import { itemCreationIntent, itemCreationSuccess, itemEditIntent, itemEditSuccess } from '@proton/pass/store/actions';
import { selectAutosaveCandidate, selectAutosaveVault, selectItemByShareIdAndId } from '@proton/pass/store/selectors';
import type { AutosavePrompt, FormEntry, FormEntryStatus } from '@proton/pass/types';
import { AutosaveType, WorkerMessageType } from '@proton/pass/types';
import { first } from '@proton/pass/utils/array/first';
import { deobfuscate } from '@proton/pass/utils/obfuscate/xor';
import { uniqueId } from '@proton/pass/utils/string/unique-id';
import { getEpoch } from '@proton/pass/utils/time/epoch';
import { isValidURL } from '@proton/pass/utils/url/is-valid-url';

import WorkerMessageBroker from '../channel';
import store from '../store';

export const createAutoSaveService = () => {
    const resolvePromptOptions = (submission: FormEntry<FormEntryStatus.COMMITTED>): AutosavePrompt => {
        const candidates = selectAutosaveCandidate({
            domain: submission.domain,
            subdomain: submission.subdomain,
            username: submission.data.username,
        })(store.getState());

        /* If no login items found for the current domain & the current
         * username - prompt for autosaving a new entry */
        if (candidates.length === 0) return { shouldPrompt: true, data: { type: AutosaveType.NEW } };

        /* If we cannot find an entry which also matches the current submission's
         * password then we should prompt for update */
        const match = candidates.filter((item) => deobfuscate(item.data.content.password) === submission.data.password);
        const { itemId, shareId, data } = first(candidates)!;
        const { name } = data.metadata;

        return match.length > 0
            ? { shouldPrompt: false }
            : { shouldPrompt: true, data: { type: AutosaveType.UPDATE, selectedItem: { itemId, shareId }, name } };
    };

    WorkerMessageBroker.registerMessage(WorkerMessageType.AUTOSAVE_REQUEST, async ({ payload }) => {
        const state = store.getState();
        const { valid, url } = isValidURL(payload.domain);

        if (payload.type === AutosaveType.NEW) {
            const selectedVault = selectAutosaveVault(state);
            const item = itemBuilder('login');

            item.get('metadata')
                .set('name', payload.name)
                .set('note', c('Info').t`Autosaved on ${payload.domain}`);

            item.get('content')
                .set('username', payload.username)
                .set('password', payload.password)
                .set('urls', valid ? [url] : [])
                .set('passkeys', payload.passkey ? [payload.passkey] : []);

            return new Promise<boolean>((resolve) =>
                store.dispatch(
                    itemCreationIntent(
                        {
                            ...item.data,
                            createTime: getEpoch(),
                            extraData: { withAlias: false },
                            optimisticId: uniqueId(),
                            shareId: selectedVault.shareId,
                        },
                        (action) => resolve(itemCreationSuccess.match(action))
                    )
                )
            );
        }

        if (payload.type === AutosaveType.UPDATE) {
            const { selectedItem } = payload;
            const { shareId, itemId } = selectedItem;

            const currentItem = selectItemByShareIdAndId<'login'>(shareId, itemId)(state);
            if (!currentItem) throw new Error(c('Error').t`Item does not exist`);

            const item = itemBuilder('login', currentItem.data);
            const { passkey } = payload;

            item.get('metadata').set('name', payload.name);

            item.get('content')
                .set('username', (username) => (passkey ? username : payload.username))
                .set('password', (password) => (passkey ? password : ''))
                .set('urls', (urls) => Array.from(new Set(urls.concat(valid ? [url] : []))))
                .set('passkeys', (passkeys) => (passkey ? [...passkeys, passkey] : passkeys));

            return new Promise<boolean>((resolve) =>
                store.dispatch(
                    itemEditIntent(
                        {
                            ...item.data,
                            lastRevision: currentItem.revision,
                            itemId,
                            shareId,
                        },
                        (action) => resolve(itemEditSuccess.match(action))
                    )
                )
            );
        }

        return false;
    });

    return { resolvePromptOptions };
};

export type AutoSaveService = ReturnType<typeof createAutoSaveService>;
