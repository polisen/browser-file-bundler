/**
* @param {File|Blob} - file to slice
* @param {Number} - chunksAmount
* @return {Array} - an array of Blobs
* */
export function sliceFile(file: File, chunksAmount: number) {
  let byteIndex = 0;
  const chunks = [];

  for (let i = 0; i < chunksAmount; i += 1) {
    const byteEnd = Math.ceil((file.size / chunksAmount) * (i + 1));
    chunks.push(file.slice(byteIndex, byteEnd));
    byteIndex += (byteEnd - byteIndex);
  }

  return chunks;
}

export function concatUint8Arrays(arrays: Uint8Array[]) {
  const totalLength = arrays.reduce((acc, value) => acc + value.length, 0);

  if (!arrays.length) return new Uint8Array();

  const result = new Uint8Array(totalLength);

  // for each array - copy it over result
  // next array is copied right after the previous one
  let length = 0;
  arrays.forEach((arr) => {
    result.set(arr, length);
    length += arr.length;
  });

  return result;
}
