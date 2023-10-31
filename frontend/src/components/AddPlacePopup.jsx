import { useState } from 'react';
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');


  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlaceSubmit(name, link);
  }

  function handleChange(e) {
    e.preventDefault();
    e.target.name === "name"
      ? setName(e.target.value)
      : setLink(e.target.value);
  }

  return (
    <PopupWithForm
      title="Novo Local"
      name="location"
      buttonText="Criar"
      buttonClass="location__create-button"
      formName="form_local"
      formClass="popup__form_local"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        placeholder="Título"
        className="popup__input popup__input-name location__input-title"
        id="title-input"
        required
        minLength="2"
        maxLength="30"
        onChange={handleChange}
      />
      <span className="popup__placeholder title-input-error"></span>
      <input
        type="url"
        name="link"
        placeholder="Link de imagem"
        className="popup__input location__input-url"
        id="url-input"
        required
        onChange={handleChange}
      />
      <span className="location__placeholder url-input-error"></span>
    </PopupWithForm>
  );
}
