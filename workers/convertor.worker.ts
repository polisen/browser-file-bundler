/* eslint-disable no-restricted-globals */

addEventListener('message', (event: MessageEvent) => {
  console.debug('event', event);
  // console.debug(ffmpeg);
  postMessage('ffmpeg');
});

export {};
