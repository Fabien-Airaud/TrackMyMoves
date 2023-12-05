import * as FileSystem from 'expo-file-system';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';

import { newAccount } from '../../redux/apiAccountSlice';
import { retrieveAccountAPI } from '../APIFunctions';
import AppTab from './AppTab';
import HomeStack from './HomeStack';
import FirebaseStack from './FirebaseStack';
import { auth } from '../../firebaseConfig';

const AppNav = () => {
    // Firebase user state
    const [firebaseUser, setFirebaseUser] = useState(auth.currentUser);

    const dispatch = useDispatch();

    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          setFirebaseUser(user);
        } else {
          // User is signed out
          setFirebaseUser(undefined);
        }
      });

    useEffect(() => {
        // log in if has a logIn file in local
        const logIn = async () => {
            const logInFileURI = FileSystem.documentDirectory + 'logIn.json';
            const fileInfo = await FileSystem.getInfoAsync(logInFileURI);

            // if log in file exists
            if (fileInfo.exists && !fileInfo.isDirectory) {
                const accountToken = await FileSystem.readAsStringAsync(logInFileURI);

                // Try to log in with the token or delete logIn file
                const account = await retrieveAccountAPI(accountToken, 0);
                if (account) dispatch(newAccount({ token: accountToken, account: account }));
                else await FileSystem.deleteAsync(logInFileURI);
            }
        };

        logIn().catch(console.error);;
    }, []);

    // Logged account stored in redux
    const loggedAccount = useSelector((state) => state.apiAccount);

    if (firebaseUser) return <FirebaseStack />
    else if (loggedAccount.token) return <AppTab />;
    else return <HomeStack />;
};

export default AppNav;