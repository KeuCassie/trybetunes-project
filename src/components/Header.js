import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      isLoading: true,
    };
  }

  async componentDidMount() {
    const nameUser = await getUser();
    this.setState({
      userName: nameUser.name,
      isLoading: false,
    });
  }

  render() {
    const {
      userName,
      isLoading,
    } = this.state;

    return (
      <header data-testid="header-component">
        {isLoading ? <Loading />
          : (
            <nav data-testid="header-user-name">
              <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
              <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
              <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
              <p>{userName}</p>
            </nav>
          )}
      </header>

    );
  }
}

export default Header;
