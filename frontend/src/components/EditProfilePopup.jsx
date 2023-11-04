import PopupWithForm from './PopupWithForm'

import { CurrentUserContext } from "../contexts/CurrentUserContext";

import { useContext, useEffect, useState } from 'react';

export default function EditProfilePopup(props) {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name || '');
    setAbout(currentUser.about || '');
  }, [currentUser]);

  function handleChange(e) {
    e.target.name === "nameP"
      ? setName(e.target.value)
      : setAbout(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser(
      name,
      about,
    );
  }

  return(
    <PopupWithForm
          title="Editar perfil"
          buttonText="Salvar"
          name=""
          buttonClass="popup__save-button"
          formName="profile__form"
          formClass="popup__form_edit-profile"
          isOpen={props.isOpen}
          onClose={props.onClose}
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="nameP"
            placeholder="Nome"
            className="popup__input popup__input-name"
            required
            id="name-input"
            minLength="2"
            maxLength="40"
            value={name}
            onChange={handleChange}
          />
          <span className="popup__placeholder name-input-error"></span>

          <input
            type="text"
            name="About"
            placeholder="Sobre mim"
            className="popup__input popup__input-About"
            id="About-input"
            required
            minLength="2"
            maxLength="200"
            value={about}
            onChange={handleChange}
          />

          <span className="popup__placeholder About-input-error"></span>
        </PopupWithForm>
  )
}