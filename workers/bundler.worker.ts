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
  folder: string;
  id: string;
}

type Files = FileObj[];

export const createQueue = (files: Files) => {
  const obj: any = {};
  const pathIds: any = {};
  files.forEach(({ path, ...rest }: { path: string }) => {
    const split = path.split('/').filter((f: string) => f);
    split.shift();
    const relativePath = split.join('/');
    if (!pathIds[split[0]]) pathIds[split[0]] = nanoid();
    if (!obj[pathIds[split[0]]]) obj[pathIds[split[0]]] = [];
    obj[pathIds[split[0]]].push({
      path,
      folder: split[0],
      relativePath,
      id: pathIds[split[0]],
      ...rest,
    });
  });
  return obj;
};

interface Queue {
  [key: string]: FileObj[];
}

const parseQueue = (queue: Queue) => Object.entries(queue).map(([key, value]) => {
  const files: any[] = [];
  const objectType = value.length > 1 ? 'folder' : 'file';
  let entityName = '';
  let cumulativeSize = 0;

  value.forEach((fileObj: FileObj) => {
    const {
      file: { name, size, type },
      relativePath,
      folder,
      path,
    } = fileObj;
    files.push({
      name,
      size,
      folder,
      type,
      relativePath,
      path,
    });
    cumulativeSize += size;
    entityName = folder;
  });
  return {
    id: key,
    objectType,
    cumulativeSize,
    files,
    entityName,
  };
});

function zip(folderObject: { files: Files; id: string }) {
  // console.debug('zip files', files);

  const zipper = new Worker(
    new URL('../workers/zipper.worker.ts', import.meta.url),
  );
  zipper.onmessage = (evt: any) => {
    console.debug('bundler zip', evt.data);
    if (evt.data.type === 'result') {
      postMessage(evt.data, [evt.data.payload.buffer]);
    } else {
      postMessage(evt.data);
    }
    if (evt.data.type === 'result') {
      fetch(evt.data.payload).then((b) => console.debug(b.blob()));
      zipper.terminate();
      fetch(evt.data.payload).then((b) => console.debug(b.blob()));
    }
  };
  zipper.postMessage(folderObject);
}

function gzip(file: FileObj) {
  const gzipper = new Worker(
    new URL('../workers/gzipper.worker.ts', import.meta.url),
  );
  gzipper.onmessage = (evt: any) => {
    console.debug('bundler gzip', evt.data);
    // postMessage(evt.data, [evt.data.payload.buffer]);
    gzipper.terminate();
  };
  gzipper.postMessage(file);
}

function delegate(id: string, files: Files) {
  console.debug({ id, files });
  if (files.length > 1) {
    zip({ files, id });
  } else if (files.length === 1) {
    gzip({ ...files[0], id });
  }
}

addEventListener('message', (event: MessageEvent) => {
  console.debug('gay');
  const queue = createQueue(event.data);
  postMessage({ payload: parseQueue(queue), type: 'queue', source: 'bundler' });
  Object.entries(queue).forEach(([id, files]: any) => {
    delegate(id, files);
  });
});

export {};
