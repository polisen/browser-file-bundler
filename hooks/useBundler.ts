import { useEffect, useRef, useCallback } from 'react';
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import { appendResults, setFiles } from 'slices/onboardingSlice';

function useBundler() {
  const workerRef: any = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    workerRef.current = new Worker(
      new URL('../workers/bundler.worker.ts', import.meta.url),
    );
    workerRef.current.onmessage = (evt: any) => {
      dispatch(appendResults(evt.data));
    };
    return () => {
      workerRef.current.terminate();
    };
  }, []);

  const handleWork = useCallback(async (files: File[]) => {
    console.debug('filesa', files);
    const fileObjects: any[] = files.map((f: any) => ({
      id: nanoid(),
      file: f,
      path: f.path,
    }));
    dispatch(setFiles(fileObjects));
    console.debug(fileObjects);
    workerRef.current.postMessage(fileObjects);
  }, []);

  return { handleWork };
}

export default useBundler;
