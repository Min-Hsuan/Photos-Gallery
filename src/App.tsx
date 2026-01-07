import { useContext } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Container from './components/Container';
import Modal from './components/UI/Modal';
import LikeList from './components/LikeList';
import { ModalContext } from './store/modal-context';

function App() {
  const navigate = useNavigate();
  const modalContext = useContext(ModalContext);
  const { modalIsOpened, setModalClosed, setModalOpened } = modalContext;
  
  const submitSearchHandler = (searchText: string) => {
    const url = `/search/${searchText}`;
    navigate(url);
  };

  return (
    <>
      <Header onLoadSearch={submitSearchHandler} onOpen={setModalOpened} />

      <Modal onClose={setModalClosed} show={modalIsOpened}>
        <LikeList onClose={setModalClosed} />
      </Modal>

      <Routes>
        <Route 
          path="/" 
          element={<Container searchText="taiwan" onOpen={setModalOpened} />} 
        />
        <Route
          path="/search/:searchText"
          element={<Container showTitle={true} onOpen={setModalOpened} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
