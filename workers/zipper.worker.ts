/* eslint-disable no-restricted-globals */
import JSZip from 'jszip';
import { FileObj } from './bundler.worker';

const zip = new JSZip();

addEventListener('message', async (event: MessageEvent) => {
  // console.debug('worker event message', event.target, event.type, event.data);
  console.debug('zipdata', event.data);
  const { files, folder, id } = event.data;
  files.forEach(({ path, file }: FileObj) => zip.file(path, file, {
    createFolders: true,
  }));
  try {
    const payload = await zip.generateAsync({ type: 'uint8array' }, (metadata: any) => {
      postMessage({
        payload: metadata, type: 'progress', source: 'zip', id,
      });
    });
    console.debug('zipper', payload);

    postMessage({
      payload,
      folder,
      id,
      type: 'result',
      source: 'zip',
    }, [payload.buffer]);
  } catch (error) {
    console.error(error);
  }
});

export {};
