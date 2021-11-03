import 'styles/globals.css';
import { store, rrfProps } from 'lib/store';
import { Provider } from 'react-redux';
import {
  ReactReduxFirebaseProvider,
} from 'react-redux-firebase';
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
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <Component {...pageProps} />
        </ReactReduxFirebaseProvider>
      </Provider>
    </Wrapper>
  );
}

export default MyApp;
