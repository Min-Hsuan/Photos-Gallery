import React, { useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import Header from './components/Header';
import Container from './components/Container';
import Modal from './components/UI/Modal';
import LikeList from './components/LikeList';

function App() {
  const history = useHistory();
  const submitSearchHandler = (searchText) => {
    let url = `/search/${searchText}`;
    history.push(url);
  };
  const [overlayIsOpened, setOverlayIsOpened] = useState(false);
  const closeOverlayHandler = () => {
    setOverlayIsOpened(false);
  };
  const openOverlayHandler = () => {
    setOverlayIsOpened(true);
  };

  return (
    <React.Fragment>
      <Header onLoadSearch={submitSearchHandler} onOpen={openOverlayHandler} />

      <Modal onClose={closeOverlayHandler} show={overlayIsOpened}>
        <LikeList onClose={closeOverlayHandler} />
      </Modal>

      <Switch>
        <Route path="/" exact>
          <Container searchText="taiwan" onOpen={openOverlayHandler} />
        </Route>
        <Route
          path="/search/:searchText"
          render={(props) => (
            <Container
              showTitle={true}
              searchText={props.match.params.searchText}
              onOpen={openOverlayHandler}
            />
          )}
        />
        <Route path="*">
            <Redirect to="/" />
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
