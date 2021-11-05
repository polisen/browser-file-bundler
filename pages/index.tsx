import React, { useEffect } from 'react';
import Dropzone from 'components/Dropzone';
// import { createFFmpeg } from '@ffmpeg/ffmpeg';
import styled from 'styled-components';
import useBundler from 'hooks/useBundler';
import {useFileUploader} from 'hooks/useFileUploader';
import { useSelector } from 'react-redux';
import Files from 'components/Files';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const DivDiv = styled.div`
  #box-left-mini {
    float: left;
    width: 100%;
  }

  #box-left-mini #front {
    display: flex;
    height: 24px;
    border: 1px solid #3b3b3b;
    align-items: center;
    justify-content: center;
    border-radius: 8px;

    z-index: 5;
    position: relative;
    p {margin: 0;}
  }
  #box-left-mini #front span {
    /* background: #fff; */
  }

  #box-left-mini #behind_container {
  background-color: #3b3b3b;
    position: relative;
    border-radius: 8px;
    height: 24px;
    width: 75%;
    top: -24px;
  }
  #box-left-mini #behind {
    display: flex;
    z-index: 3;
  }
`;

export default function Home() {
  const files = useSelector((state: any) => state.fileProcessing.bundles);
  const { handleWork } = useBundler();
  useFileUploader();

  function handleFiles(acceptedFiles: File[]) {
    if (acceptedFiles.length > 0) {
      handleWork(acceptedFiles);
    }
  }

  return (
    <>
      <Container>
        {Object.keys(files).length > 0 ? (
          <Files />
        ) : (
          <Dropzone
            setFiles={(acceptedFiles: File[]) => handleFiles(acceptedFiles)}
          />
        )}
      </Container>
      <DivDiv>
        <div id="box-left-mini">
          <div id="front">
            <span>this is in front</span>
          </div>
          <div id="behind_container">
            {/* <div id="behind">behind</div> */}
          </div>
        </div>
      </DivDiv>
    </>
  );
}
