/* eslint-disable import/no-unresolved */
/* eslint-disable no-restricted-globals */
import { sliceFile, concatUint8Arrays } from 'utility';

const pako = require('pako');

addEventListener('message', async (event: MessageEvent) => {
  const {
    file, path, relativePath, id,
  } = event.data;
  // console.debug('event.data', event.data);
  const {
    name, type, size,
  } = event.data.file;
  const chunks = sliceFile(file, 4);

  const deflatedChunks = chunks
    .map((b: Blob) => b.arrayBuffer().then((ab: ArrayBuffer) => pako.gzip(ab)));
  const results = await Promise.all(deflatedChunks);

  const concatedArray = concatUint8Arrays(results);

  postMessage({
    payload: {
      name,
      type,
      size,
      path,
      relativePath,
      url: URL.createObjectURL(new File([concatedArray], file.name, {
        type: 'gzip',
      })),
    },
    id,
    type: 'result',
    source: 'gzip',
  });
});

export {};
