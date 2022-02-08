import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Search from './pages/Search';
import Login from './pages/Login';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <h1>TRYBETUNES</h1>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="/search" component={ Search } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/profile" component={ Profile } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
