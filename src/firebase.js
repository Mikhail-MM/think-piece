
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

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
export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserProfileDocument = async (user, additionalData)  => {
  if (!user) return;
  // Get a reference to the place in the database where a user profile might be.
  const userRef = firestore.doc(`users/${user.uid}`);
  // Go and fetch the document from that location.
  const snapshot = await userRef.get();
  // Create a new user document in the FireStore DB if the user with this UID does not exist
  if (!snapshot.exists) {
    const { displayName, email, photoURL} = user;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email, photoURL,
        createdAt,
        ...additionalData
      })
    } catch(err) {
      console.error('Error creating user', err);
    }
  }
  // Always return an object containing { The user's ID, as well as the other data - This is for SetState}
  return getUserDocumentRef(user.uid);
}

export const getUserDocumentRef = (uid) => {
  if (!uid) return null;
  try {
    return firestore.collection('users').doc(uid)
  } catch(err) {
    console.error('Error fetching user', err.message);
  }
}
/*This configuration "settings" object is used because FireBase added a breaking change
* to how dates were stored internally.
*/

const settings = {
  timestampsInSnapshots: true
};

firestore.settings(settings);
