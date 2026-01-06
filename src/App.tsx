import { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Container from './components/Container';
import Modal from './components/UI/Modal';
import LikeList from './components/LikeList';

function App() {
  const navigate = useNavigate();
  
  const submitSearchHandler = (searchText: string) => {
    let url = `/search/${searchText}`;
    navigate(url);
  };
  
  const [overlayIsOpened, setOverlayIsOpened] = useState(false);
  
  const closeOverlayHandler = () => {
    setOverlayIsOpened(false);
  };
  
  const openOverlayHandler = () => {
    setOverlayIsOpened(true);
  };

  return (
    <>
      <Header onLoadSearch={submitSearchHandler} onOpen={openOverlayHandler} />

      <Modal onClose={closeOverlayHandler} show={overlayIsOpened}>
        <LikeList onClose={closeOverlayHandler} />
      </Modal>

      <Routes>
        <Route 
          path="/" 
          element={<Container searchText="taiwan" onOpen={openOverlayHandler} />} 
        />
        <Route
          path="/search/:searchText"
          element={<Container showTitle={true} onOpen={openOverlayHandler} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
