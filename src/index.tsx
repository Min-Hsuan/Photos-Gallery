import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import ImageContextProvider from './store/image-context';
import UserContextProvider from './store/user-context';
import ModalContextProvider from './store/modal-context';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserContextProvider>
      <BrowserRouter>
        <ImageContextProvider>
          <ModalContextProvider>
            <App />
          </ModalContextProvider>
        </ImageContextProvider>
      </BrowserRouter>
    </UserContextProvider>
  </StrictMode>
)
