/* eslint-disable no-alert */
import { useEffect, useRef, useCallback } from 'react';
import * as React from 'react';

const IndexPage = () => {
  const workerRef: any = useRef();
  useEffect(() => {
    workerRef.current = new Worker(new URL('../workers/bundler.worker.ts', import.meta.url));
    workerRef.current.onmessage = (evt: any) => alert(`WebWorker Response => ${evt.data}`);
    return () => {
      workerRef.current.terminate();
    };
  }, []);

  const handleWork = useCallback(async () => {
    workerRef.current.postMessage(100000);
  }, []);

  return (
    <div>
      <p>Do work in a WebWorker!</p>
      <button type="button" onClick={handleWork}>Calculate PI</button>
    </div>
  );
};

export default IndexPage;
