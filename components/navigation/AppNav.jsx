import { useSelector } from 'react-redux';

import AppTab from './AppTab';
import HomeStack from './HomeStack';

const AppNav = () => {
    // Logged account stored in redux
    const loggedAccount = useSelector((state) => state.logIn.account);

    if (loggedAccount) return <AppTab />;
    else return <HomeStack />;
};

export default AppNav;