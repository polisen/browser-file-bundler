import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { firebaseReducer } from 'react-redux-firebase';
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore';
import fileProcessingSlice from 'slices/fileProcessingSlice';
import firebase from './firebase';

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
  // enableClaims: true // Get custom claims along with the profile
};

export const store = configureStore({
  reducer: {
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    fileProcessing: fileProcessingSlice,
  },
});

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;
