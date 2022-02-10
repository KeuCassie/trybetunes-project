import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    inputText: '',
    disableButton: true,
  };

  toDisableButton = ({ target }) => {
    const { value } = target; // desestrutura o valor do alvo
    const maxChar = 2; // máximo de caracteres
    this.setState({ // seta o estado
      inputText: value, // o estado do inputName agora é o value
      disableButton: true, // o estado desabilitado do botão é verdadeiro
    });
    if (value.length >= maxChar) { // condicional - se o tamanho do valor for maior ou iguao a 3
      this.setState({ // seta o estado
        inputText: value,
        disableButton: false, // o estado desabilitado do botão é falso
      });
    }
  }

  render() {
    const {
      inputText,
      disableButton,
    } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="inputText">
            <input
              data-testid="search-artist-input"
              type="text"
              name="inputText"
              value={ inputText }
              onChange={ this.toDisableButton }
            />
          </label>
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ disableButton }
          >
            Pesquisar

          </button>

        </form>
      </div>
    );
  }
}

export default Search;
