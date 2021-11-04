import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const FileContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    div {
      border: none;
      height: 1em;
    }
    margin: 5px;
    border: 1px solid white;
  }
`;

function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
}
export default function Files() {
  const fileList = useSelector((state: any) => state.fileProcessing);
  return (
    <FileContainer>
      {Object.entries(fileList).map(
        ([
          ,
          {
            objectType,
            cumulativeSize,
            conversionProgress,
            files,
            entityName,
            source,
          },
        ]: any) => {
          if (!files) return <></>;
          return (
            <div>
              <div>{entityName}</div>

              <div>{objectType}</div>
              <div>{formatBytes(cumulativeSize)}</div>
              {conversionProgress && (
                <div>
                  Progress:
                  {Math.floor(Number(conversionProgress))}
                  %
                </div>
              )}
              <div>
                n_files:
                {' '}
                {files.length}
              </div>
              <div>{source}</div>
            </div>
          );
        },
      )}
    </FileContainer>
  );
}
