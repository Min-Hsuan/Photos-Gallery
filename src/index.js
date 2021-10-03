import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import ImageContextProvider from './store/image-context';
import UserContextProvider from './store/user-context';

ReactDOM.render(
  <UserContextProvider>
    <BrowserRouter>
      <ImageContextProvider>
        <App />
      </ImageContextProvider>
    </BrowserRouter>
  </UserContextProvider>,
  document.getElementById('root')
);


