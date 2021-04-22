import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAfpliuIAWPti8FpLVXNCd3B_f3r8mCILQ",
    authDomain: "fik-information-app.firebaseapp.com",
    databaseURL: "https://fik-information-app-default-rtdb.firebaseio.com",
    projectId: "fik-information-app",
    storageBucket: "fik-information-app.appspot.com",
    messagingSenderId: "356064038281",
    appId: "1:356064038281:web:19c1ee6d2dfe13da9b2558",
    measurementId: "G-Q8JPT4Y8NN"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const database = firebase.database();

  export default firebase;