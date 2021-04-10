import { CALENDAR_FLAGS } from 'proton-shared/lib/calendar/constants';
import React, { useMemo, useState } from 'react';
import {
    ErrorBoundary,
    StandardErrorPage,
    useAddresses,
    useCalendars,
    useUser,
    useWelcomeFlags,
} from 'react-components';

import CalendarOnboardingContainer from '../setup/CalendarOnboardingContainer';
import CalendarSetupContainer from '../setup/CalendarSetupContainer';
import ResetContainer from '../setup/ResetContainer';
import MainContainerSetup from './MainContainerSetup';

const MainContainer = () => {
    const [addresses] = useAddresses();
    const [calendars] = useCalendars();
    const [user] = useUser();

    const memoedCalendars = useMemo(() => calendars || [], [calendars]);
    const memoedAddresses = useMemo(() => addresses || [], [addresses]);

    const [welcomeFlags, setWelcomeFlagsDone] = useWelcomeFlags();

    const [hasCalendarToGenerate, setHasCalendarToGenerate] = useState(() => {
        return memoedCalendars.length === 0;
    });

    const [calendarsToReset, setCalendarsToReset] = useState(() => {
        return memoedCalendars.filter(({ Flags }) => {
            return (Flags & (CALENDAR_FLAGS.RESET_NEEDED | CALENDAR_FLAGS.UPDATE_PASSPHRASE)) > 0;
        });
    });

    const [calendarsToSetup, setCalendarsToSetup] = useState(() => {
        return memoedCalendars.filter(({ Flags }) => {
            return (Flags & CALENDAR_FLAGS.INCOMPLETE_SETUP) > 0;
        });
    });

    if (hasCalendarToGenerate) {
        return <CalendarSetupContainer onDone={() => setHasCalendarToGenerate(false)} />;
    }

    if (calendarsToSetup.length) {
        return <CalendarSetupContainer calendars={calendarsToSetup} onDone={() => setCalendarsToSetup([])} />;
    }

    if (welcomeFlags.isWelcomeFlow) {
        return <CalendarOnboardingContainer onDone={() => setWelcomeFlagsDone()} />;
    }

    if (calendarsToReset.length) {
        return <ResetContainer calendars={calendarsToReset} onDone={() => setCalendarsToReset([])} />;
    }

    return <MainContainerSetup user={user} addresses={memoedAddresses} calendars={memoedCalendars} />;
};

const WrappedMainContainer = () => {
    return (
        <ErrorBoundary component={<StandardErrorPage />}>
            <MainContainer />
        </ErrorBoundary>
    );
};

export default WrappedMainContainer;
