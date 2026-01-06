import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import ImageContextProvider from './store/image-context';
import UserContextProvider from './store/user-context';

ReactDOM.createRoot(document.getElementById('root')!).render(

  <UserContextProvider>
    <BrowserRouter>
      <ImageContextProvider>
        <App />
      </ImageContextProvider>
    </BrowserRouter>
  </UserContextProvider>
)

