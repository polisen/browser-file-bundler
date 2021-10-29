import 'styles/globals.css';
import styled from 'styled-components';
import React from 'react';

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  color: white;
  background-color: #000;
`;

function MyApp({ Component, pageProps }: any) {
  return (
    <Wrapper>
      <Component {...pageProps} />
    </Wrapper>
  );
}

export default MyApp;
