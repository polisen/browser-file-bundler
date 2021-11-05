import { useEffect } from 'react';
import { useFirebase } from 'react-redux-firebase';
import { useSelector, useDispatch } from 'react-redux';
import { QueueNextUpload, setTaskState, setProgress } from 'slices/fileProcessingSlice';

async function packageForUpload(bundle: any) {
  const file = await fetch(bundle.payload);
  console.debug({ file });
  return {
    file,
    metadata: {},
    path: `test${bundle.entityName}`,
  };
}

export const useFileUploader = () => {
  /** Hook State */
  const dispatch = useDispatch();
  const { currentBundleId, bundles, taskState } = useSelector((state: any) => state.fileProcessing);

  /** Firebase Initialization */
  const firebase: any = useFirebase();
  const storage = firebase.storage().ref();

  useEffect(() => {
    if (!currentBundleId) return;
    async function packageNextObject() {
      const { path, file, metadata } = await packageForUpload(bundles[currentBundleId]);
      const ref = storage.child(path).put(file, metadata);

      ref.on(
        'state_changed',
        (snapshot: any) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          dispatch(setProgress(progress));
          if (taskState !== snapshot.state) dispatch(setTaskState(snapshot.state));
        },
        (error: Error) => {
          console.error(error);
        },
        () => {
          dispatch(setTaskState('complete'));
          ref.snapshot.ref.getDownloadURL().then((downloadURL: string) => {
            console.debug('File available at', downloadURL);
            dispatch(QueueNextUpload(''));
          });
        },
      );
    }
    packageNextObject();
  }, [currentBundleId]);

  return {
    toggleState: (str: string) => dispatch(setTaskState(str)),
  };
};
