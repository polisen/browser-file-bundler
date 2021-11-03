import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/functions';

// Your web app's Firebase configuration
const fbConfig = {
  apiKey: 'AIzaSyBsPBrWjq5zP-oZGMeTbTipN714UzwyBqk',
  authDomain: 'interlink-318621.firebaseapp.com',
  databaseURL:
    'https://interlink-318621-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'interlink-318621',
  storageBucket: 'interlink-318621.appspot.com',
  messagingSenderId: '271790382418',
  appId: '1:271790382418:web:85740bdc99e26ca0e6ee8b',
  measurementId: 'G-DPSZ0FWPF1',
};

// Initialize Firebase
try {
  firebase.initializeApp(fbConfig);
  firebase.auth();
  firebase.functions();
  firebase.firestore();
  firebase.storage();
  if (window && window.location.hostname === 'localhost') {
    console.debug(
      'testing locally -- hitting local functions and firestore emulators',
    );
    firebase.functions().useEmulator('localhost', 5001);
    firebase
      .auth()
      .useEmulator('http://localhost:9099');
    firebase.storage().useEmulator('localhost', 9199);
    firebase.firestore().settings({
      host: 'localhost:8080',
      ssl: false,
    });
  }
  console.debug('Firebase Initialized');
} catch (err) {
  console.debug('err', err);
  console.debug('Error Initializing Firebase');
}

export default firebase;
// export const firestore = firebase.firestore()

/** `
 * Gets a users/{uid} document with username
 * @param  {string} username
 */

/** `
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc: any) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}
