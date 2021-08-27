import './App.css';
import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './components/Header';
import Container from './components/Container';

function App() {
  const history = useHistory();
  const submitSearchHandler = (searchText) => {
    let url = `/search/${searchText}`
    history.push(url)
  };

  return (
    <React.Fragment>
      <Header onLoadSearch={submitSearchHandler} />
      <Switch>
        <Route path="/" exact >
          <Container searchText="taiwan"  />
        </Route>
        <Route path="/search/:searchText" render={props=>(<Container showTitle={true} searchText={props.match.params.searchText} />)}>
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
