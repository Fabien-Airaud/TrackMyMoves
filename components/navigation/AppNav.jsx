import * as FileSystem from 'expo-file-system';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { logInAccount } from '../../redux/logInSlice';
import AppTab from './AppTab';
import HomeStack from './HomeStack';

const AppNav = () => {
    // Variables using hooks
    const dispatch = useDispatch();
    const accounts = useSelector((state) => state.accounts);

    useEffect(() => {
        // log in if has a log in file in local
        const dispatchLogIn = async () => {
            const logInFileURI = FileSystem.documentDirectory + 'logIn.json';
            const fileInfo = await FileSystem.getInfoAsync(logInFileURI);

            // if log in file exists and there are at least 1 account
            if (fileInfo.exists && !fileInfo.isDirectory && !(accounts.length === 0)) {
                const accountId = await FileSystem.readAsStringAsync(logInFileURI);

                // Try to find the relative account for the accountId given
                const account = accounts.find(account => account.id === accountId);

                // If found an account, then dispatch it to log in
                if (account) dispatch(logInAccount(account));
                else await FileSystem.deleteAsync(logInFileURI);
            }
        };

        dispatchLogIn().catch(console.error);;
    }, []);

    // Logged account stored in redux
    const loggedAccount = useSelector((state) => state.logIn);

    if (loggedAccount) return <AppTab />;
    else return <HomeStack />;
};

export default AppNav;