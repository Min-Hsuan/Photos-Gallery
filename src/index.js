import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
