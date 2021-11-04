import styled from 'styled-components';
import React, { useEffect } from 'react';
import Dropzone from 'components/Dropzone';
// import { createFFmpeg } from '@ffmpeg/ffmpeg';
import useBundler from 'hooks/useBundler';
import { useSelector } from 'react-redux';
import Files from 'components/Files';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default function Home() {
  const files = useSelector((state: any) => state.fileProcessing);
  const { handleWork } = useBundler();

  function handleFiles(acceptedFiles: File[]) {
    if (acceptedFiles.length > 0) {
      handleWork(acceptedFiles);
    }
  }

  return (
    <Container>
      {
        Object.keys(files).length > 0
          ? <Files />
          : <Dropzone setFiles={(acceptedFiles: File[]) => handleFiles(acceptedFiles)} />
      }
    </Container>
  );
}
