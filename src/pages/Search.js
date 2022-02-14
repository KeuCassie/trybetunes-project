import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import ArtistAlbums from '../components/ArtistAlbums';
import '../App.css';

class Search extends Component {
  state = {
    inputText: '',
    disableButton: true,
    isLoading: false,
    artistName: '',
    artistAlbums: [],
    response: false,
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

  searchButtonClick = async () => {
    const { inputText } = this.state; // desestrutura o estado do inputText
    this.setState({ // seta os estados do inputText e do isLoading
      inputText: '',
      isLoading: true,
    });
    const searchAlbums = await searchAlbumsAPI(inputText); // função da API espera receber uma string - estado do inputext -
    this.setState({ // seta os novos estados
      isLoading: false,
      artistName: inputText, // artistName = nome digitado no inputText
      artistAlbums: searchAlbums, // artistAlbums guarda dentro do array vazio as informações vindas da API
      response: true, // seta se a resposta da api é verdadeiro ou falsa
    });
  }

  render() {
    const {
      inputText,
      disableButton,
      isLoading,
      artistName,
      artistAlbums,
      response,
    } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        {isLoading ? <Loading /> // ternário - se for true renderiza um se false renderiza outro
          : (
            <form className="form-search">
              <label htmlFor="inputText">
                <input
                  className="input-search"
                  data-testid="search-artist-input"
                  type="text"
                  name="inputText"
                  value={ inputText } // value recebe o inputText
                  onChange={ this.toDisableButton } // recebe a função que muda o valor e desabilita botão
                />
              </label>
              <button
                className="button-search"
                data-testid="search-artist-button"
                type="button"
                disabled={ disableButton } // se true ou false desabilita o botão
                onClick={ this.searchButtonClick } // recebe função que faz a busca do artista
              >
                Pesquisar

              </button>
            </form>
          )}
        {response && ( // ternário que só recebe uma resposta e faz a  condição
          <div>
            {artistAlbums.length > 0 ? <p>{`Resultado de álbuns de: ${artistName}`}</p>
              : (
                <p>Nenhum álbum foi encontrado</p>
              )}
          </div>
        )}
        <ArtistAlbums albums={ artistAlbums } />
      </div>
    );
  }
}

export default Search;
