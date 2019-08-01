
import firebase from 'firebase/app';
import 'firebase/firestore';

var config = {
  apiKey: "AIzaSyBSrxwqn9FQ91WRjPqqQVpQghZpE5zD00w",
  authDomain: "react-firebase-blogger.firebaseapp.com",
  databaseURL: "https://react-firebase-blogger.firebaseio.com",
  projectId: "react-firebase-blogger",
  storageBucket: "gs://react-firebase-blogger.appspot.com/",
  messagingSenderId: "889931848424",
  appId: "1:889931848424:web:73fb709cf4551af4"
};

if (process.env.NODE_ENV === 'development') {
  // Add firebase object to global window for experimentation
  window.firebase = firebase;
}

firebase.initializeApp(config);

export const firestore = firebase.firestore();
/*This configuration "settings" object is used because FireBase added a breaking change
* to how dates were stored internally.
*/

const settings = {
  timestampsInSnapshots: true
};

firestore.settings(settings);