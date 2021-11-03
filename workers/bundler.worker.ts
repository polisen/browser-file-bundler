/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-globals */
// import pi from "../utility/pi";
import { nanoid } from 'nanoid';
// import { files } from 'jszip';

export interface FileObj {
  file: File;
  path: string;
  relativePath?: string;
}

type Files = FileObj[];

export const createQueue = (files: Files) => {
  const obj: any = {};

  files.forEach(({ path, ...rest }: { path: string }) => {
    const split = path.split('/').filter((f: string) => f);
    split.shift();
    const relativePath = split.join('/');
    if (!obj[split[0]]) obj[split[0]] = [];
    obj[split[0]].push({ path, relativePath, ...rest });
  });
  return obj;
};

function zip(folderObject: { files: Files; folder: string; id: string }) {
  // console.debug('zip files', files);

  const zipper = new Worker(
    new URL('../workers/zipper.worker.ts', import.meta.url),
  );
  zipper.onmessage = (evt: any) => {
    postMessage(evt.data);
    if (evt.data.type === 'result') {
      zipper.terminate();
    }
  };
  zipper.postMessage(folderObject);
}

function gzip(file: FileObj) {
  const gzipper = new Worker(
    new URL('../workers/gzipper.worker.ts', import.meta.url),
  );
  gzipper.onmessage = (evt: any) => {
    postMessage(evt.data);
    gzipper.terminate();
  };
  gzipper.postMessage(file);
}

function delegate(folder: string, files: Files) {
  if (files.length > 1) {
    zip({ files, folder, id: nanoid() });
  } else if (files.length === 1) {
    gzip(files[0]);
  }
}

addEventListener('message', (event: MessageEvent) => {
  const queue = createQueue(event.data);
  Object.entries(queue).forEach(([key, files]: any) => {
    delegate(key, files);
  });
});

export {};
