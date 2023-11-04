import React from "react";
import Header from "./Header";
import UserDataForm from "./userDataForm";

import { withRouter } from "react-router-dom";

import { register } from "../utils/auth";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit(e) {
    e.preventDefault();
    let { email, password } = this.state;
    register(email, password).then((res) => {
      if (res.message === 'The "password" field is required') {
        this.props.setIsTooltipOpen(true);
        this.props.setTooltipMessage("O campo senha é requerido.")
        return;
      }
      
      if (res.message === 'The "email" field is required') {
        this.props.setIsTooltipOpen(true);
        this.props.setTooltipMessage("O campo email é requerido.")
        return;
      }
      
      if (res.message === 'The "email" field must be a valid email address') {
        this.props.setIsTooltipOpen(true);
        this.props.setTooltipMessage("O campo email deve ser um endereço de email válido.")
        return;
      }
      
      if (res.error === 'User with this email address already exists') {
        this.props.setIsTooltipOpen(true);
        this.props.setTooltipMessage("Um usuário com este email já existe.");
        return;
      }

      if (res) {
        this.setState({ message: "" }, () => {
          this.props.setSuccess(true);
          this.props.setIsTooltipOpen(true);
          this.props.history.push("/signin");
        });
      } else {
        this.setState({
          message: "Algo deu errado!",
        });
      }
    });
  }

  render() {
    return (
      <>
        <Header registerLoginLink="Entrar" pathTo="/signin" />

        <UserDataForm
          handleSubmit={this.handleSubmit}
          title="Inscrever-se"
          formName="signup"
          children=""
          onSubmit=""
          buttonText="Inscrever-se"
          linkText="Já é um membro? Faça o login aqui!"
          pathTo="/signin"
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

export default withRouter(Register);
