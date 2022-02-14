import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import '../App.css';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      inputName: '', // estado inicial do input
      isLoading: false, // estado inicial do carregamento
      isButtonDisable: true, // estado do botão desabilitado
      isRedirect: false, // estado do redirecionamento 'falso'
    };
  }

  onInputChange = ({ target }) => { // função pra pegar mudar o valor do input
    const { value } = target; // desestrutura o valor do alvo
    const maxChar = 3; // máximo de caracteres
    this.setState({ // seta o estado
      inputName: value, // o estado do inputName agora é o value
      isButtonDisable: true, // o estado desabilitado do botão é verdadeiro
    });
    if (value.length >= maxChar) { // condicional - se o tamanho do valor for maior ou iguao a 3
      this.setState({ // seta o estado
        inputName: value,
        isButtonDisable: false, // o estado desabilitado do botão é falso
      });
    }
  }

    onClickSave = async () => { // função pra salvar o login ao clicar
      const { inputName } = this.state; // pega o estado do input
      this.setState({
        isLoading: true, // mensagem 'carregando' é verdadeira
      });
      await createUser({ name: inputName }); // função assincrona que retorna um objeto. Valor do input é a chave de name
      this.setState({
        isLoading: false, // mensagem 'carregando' volta a ser falsa
        isRedirect: true, // redireciona para o search
      });
    };

    render() {
      const {
        isButtonDisable,
        inputName,
        isLoading,
        isRedirect,
      } = this.state;

      return (
        <div data-testid="page-login">
          {isLoading ? <Loading /> // condicional verifica os estado de isLoading e age de acordo com a resposta
            : (
              <form className="form-login">
                <input
                  className="input-login"
                  type=""
                  value={ inputName } // valor do input recebe o inputName
                  onChange={ this.onInputChange } // recebe a função que modifica o valor do input
                  data-testid="login-name-input"
                />
                <button
                  className="button-login"
                  type="button"
                  data-testid="login-submit-button"
                  onClick={ this.onClickSave } // recebe a função que salva o nome da pessoa ao clicar
                  disabled={ isButtonDisable } // habilita e desabilita botão
                >
                  Entrar
                </button>
              </form>
            )}
          {isRedirect && <Redirect to="/search" />}
        </div>
      );
    }
}

export default Login;
