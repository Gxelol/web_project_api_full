import React from "react";
import Header from "./Header";
import UserDataForm from "./userDataForm";

import { withRouter } from 'react-router-dom';

import { authorize, checkToken } from '../utils/auth';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.email || !this.state.password) {
      this.props.setTooltipMessage("É necessário preencher todos os campos");
      this.props.setIsTooltipOpen(true);
      return;
    }

    authorize(this.state.email, this.state.password)
      .then((res) => {
        if (res.message === 'Incorrect email address or password') {
          this.props.setIsTooltipOpen(true);
          this.props.setTooltipMessage("Email ou senha inválidos.")
          return;
        }

        if (res.token) {
          this.setState({ email: '', password: "" }, () => {
            this.props.setLoggedIn(true);
            checkToken(res.token).then((res) => {
              if (res) {
                this.props.setEmail(res.data.email);
              } else {
                this.props.setLoggedIn(false);
              }
            });
            this.props.history.push("/home");
          });
        }
      })
      .catch((err) => {
        console.log(err)
        this.props.setTooltipMessage("Ops, algo deu errado! Tente novamente.");
        this.props.setIsTooltipOpen(true);
      });
  }

  render() {
    return (
      <>
        <Header 
          registerLoginLink="Inscrever-se"  
          pathTo="/signup"
        />

        <UserDataForm
          handleSubmit={this.handleSubmit}
          title="Entrar"
          formName="signin"
          children=""
          onSubmit=""
          buttonText="Entrar"
          linkText="Ainda não é membro? Inscreva-se aqui!"
          pathTo="/signup"
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="auth__input"
            id="email-input"
            minLength="5"
            maxLength="45"
            onChange={this.handleChange}
          />
          <span className="popup__placeholder name-input-error"></span>

          <input
            type="password"
            name="password"
            placeholder="Senha"
            required
            className="auth__input"
            id="password-input"
            minLength="6"
            maxLength="45"
            onChange={this.handleChange}
          />

          <span className="popup__placeholder About-input-error"></span>
        </UserDataForm>
      </>
    );
  }
}

export default withRouter(Login);
