import { ButtonLike } from '@proton/atoms/Button';
import { SettingsLink } from '@proton/components/components';
import Icon from '@proton/components/components/icon/Icon';
import useFlag from '@proton/components/containers/unleash/useFlag';
import { useConfig, useSubscription, useUser } from '@proton/components/hooks';
import {
    DRIVE_SHORT_APP_NAME,
    MAIL_SHORT_APP_NAME,
    PLANS,
    SHARED_UPSELL_PATHS,
    UPSELL_COMPONENT,
} from '@proton/shared/lib/constants';
import { addUpsellPath, getUpgradePath, getUpsellRefFromApp } from '@proton/shared/lib/helpers/upsell';
import {
    SpaceState,
    getAppStorage,
    getAppStorageFull,
    getCanAddStorage,
    getCompleteSpaceDetails,
    getSpace,
    getStorageFull,
} from '@proton/shared/lib/user/storage';

import { DrawerAppSection } from '../shared';

const getTitle = (details: ReturnType<typeof getCompleteSpaceDetails>) => {
    if (details.base.type === SpaceState.Danger && details.drive.type === SpaceState.Danger) {
        return getStorageFull();
    }
    if (details.base.type === SpaceState.Danger) {
        return getAppStorageFull(getAppStorage(MAIL_SHORT_APP_NAME));
    }
    if (details.drive.type === SpaceState.Danger) {
        return getAppStorageFull(getAppStorage(DRIVE_SHORT_APP_NAME));
    }
    if (details.base.type === SpaceState.Warning) {
        return getPercentageFull(getAppStorage(MAIL_SHORT_APP_NAME), details.base.displayed);
    }
    if (details.drive.type === SpaceState.Warning) {
        return getPercentageFull(getAppStorage(DRIVE_SHORT_APP_NAME), details.drive.displayed);
    }
    return null;
};

const QuickSettingsStorageLimitBanner = () => {
    const storageSplitEnabled = useFlag('SplitStorage');
    const [user] = useUser();
    const [subscription] = useSubscription();
    const space = getSpace(user, storageSplitEnabled);
    const { APP_NAME } = useConfig();

    if (!storageSplitEnabled || !space.splitStorage || !getCanAddStorage({ user, subscription })) {
        return null;
    }

    const details = getCompleteSpaceDetails(space);
    const title = getTitle(details);

    const result = (() => {
        if (details.base.type === SpaceState.Danger && details.drive.type === SpaceState.Danger) {
            return {
                plan: PLANS.BUNDLE,
                title: getStorageFull(),
            };
        }

        if (details.base.type === SpaceState.Danger) {
            return {
                plan: PLANS.MAIL,
                title: getAppStorageFull(getAppStorage(MAIL_SHORT_APP_NAME)),
            };
        }

        if (details.drive.type === SpaceState.Danger) {
            return {
                plan: PLANS.DRIVE,
                title: getAppStorageFull(getAppStorage(DRIVE_SHORT_APP_NAME)),
            };
        }

        const getPercentageFull = (storage: string, percentage: number) => {
            // Translator: Drive storage 99% full
            return c('storage_split: info').t`${storage} ${percentage}% full`;
        };

        if (details.base.type === SpaceState.Warning) {
            return {
                plan: PLANS.MAIL,
                title: getPercentageFull(getAppStorage(MAIL_SHORT_APP_NAME), details.base.displayed),
            };
        }

        if (details.drive.type === SpaceState.Warning) {
            return {
                plan: PLANS.DRIVE,
                title: getPercentageFull(getAppStorage(DRIVE_SHORT_APP_NAME), details.drive.displayed),
            };
        }

        return null;
    })();

    if (!result) {
        return null;
    }

    const upsellRef = getUpsellRefFromApp({
        app: APP_NAME,
        feature: SHARED_UPSELL_PATHS.STORAGE_PERCENTAGE,
        component: UPSELL_COMPONENT.BANNER,
    });

    const { plan, title } = result;

    return (
        <DrawerAppSection>
            <ButtonLike
                as={SettingsLink}
                shape="ghost"
                fullWidth
                className="py-2 px-3"
                path={addUpsellPath(getUpgradePath({ user, subscription, plan }), upsellRef)}
            >
                <div className="flex gap-2">
                    <div className="shrink-0">
                        <Icon name="exclamation-circle-filled" className="color-danger" />
                    </div>
                    <div className="flex-1 text-left">{title}</div>
                </div>
            </ButtonLike>
        </DrawerAppSection>
    );
};

export default QuickSettingsStorageLimitBanner;
