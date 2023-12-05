import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getReactNativePersistence, initializeAuth } from 'firebase/auth';

// https://firebase.google.com/docs/web/setup#available-libraries

// Optionally import the services that you want to use
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_qR_NVeVFJzq2jRr7pUI1DoAwzep5ofQ",
  authDomain: "trackmymoves-a1b03.firebaseapp.com",
  projectId: "trackmymoves-a1b03",
  storageBucket: "trackmymoves-a1b03.appspot.com",
  messagingSenderId: "17718062252",
  appId: "1:17718062252:web:16b5737e7cb13946b84309",
  measurementId: "G-6H828WN419"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// export const auth = getAuth(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
// export const provider = new GoogleAuthProvider();
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
