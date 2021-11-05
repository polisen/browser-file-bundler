import { useEffect, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { appendResults } from 'slices/fileProcessingSlice';
import { URL } from 'url';

function useBundler() {
  const workerRef: any = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    workerRef.current = new Worker(
      new URL('../workers/bundler.worker.ts', import.meta.url),
    );
    workerRef.current.onmessage = (evt: any) => {
      console.debug('evt.data', evt.data);
      const { payload, ...rest } = evt.data;
      dispatch(
        appendResults({
          payload: URL.createObjectURL(new File([payload], rest.id)),
          ...rest,
        }),
      );
    };
    return () => {
      workerRef.current.terminate();
    };
  }, []);

  const handleWork = useCallback(async (files: File[]) => {
    console.debug('filesa', files);
    const fileObjects: any[] = files.map((f: any) => ({
      file: f,
      path: f.path,
    }));
    // dispatch(setFiles(fileObjects));
    console.debug({ fileObjects });
    workerRef.current.postMessage(fileObjects);
  }, []);

  return { handleWork };
}

export default useBundler;
