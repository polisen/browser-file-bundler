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

  const blob = await zip.generateAsync({ type: 'blob' }, (metadata: any) => {
    postMessage({
      payload: metadata, type: 'progress', source: 'zip', id,
    });
  });

  postMessage({
    payload: URL.createObjectURL(
      new File([blob], event.data.folder, { type: 'application/zip' }),
    ),
    folder,
    id,
    type: 'result',
    source: 'zip',
  });
});

export {};
