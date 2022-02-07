import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <header data-testid="header-component">
        <nav>
          <Link to="/Search" data-testid="link-to-search">Pesquisa</Link>
          <Link to="/Favorites" data-testid="link-to-favorites">Favoritas</Link>
          <Link to="/Profile" data-testid="link-to-profile">Perfil</Link>
        </nav>
      </header>

    );
  }
}

export default Header;
