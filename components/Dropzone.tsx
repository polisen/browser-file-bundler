import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function MyDropzone({ setFiles }: { setFiles: Function }) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => setFiles(acceptedFiles),
    [],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Container {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag n drop some files here, or click to select files</p>
      )}
    </Container>
  );
}

export default MyDropzone;
