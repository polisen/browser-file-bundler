import styled from 'styled-components';
import React, { useEffect } from 'react';
import Dropzone from 'components/Dropzone';
// import { createFFmpeg } from '@ffmpeg/ffmpeg';
import useBundler from 'hooks/useBundler';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default function Home() {
  // const ffmpeg = createFFmpeg({ log: true });

  // useEffect(() => {
  //   console.debug({ ffmpeg });
  // }, [ffmpeg]);
  const { handleWork } = useBundler();

  function handleFiles(acceptedFiles: File[]) {
    if (acceptedFiles.length > 0) {
      handleWork(acceptedFiles);
    }
  }

  return (
    <Container>
      <Dropzone setFiles={(files: File[]) => handleFiles(files)} />
    </Container>
  );
}
