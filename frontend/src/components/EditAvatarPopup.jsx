import PopupWithForm from './PopupWithForm'

import { createRef } from 'react';

export default function EditAvatarPopup(props) {
  const avatar = createRef();

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateAvatar({
      avatar: avatar.current.value,
    });
  } 

  return(
    <PopupWithForm
          title="Alterar a foto de perfil"
          buttonText="Salvar"
          buttonClass="edit-profile__button"
          name="edit-profile"
          formName="form_edit-profile"
          formClass="edit-profile__form"
          isOpen={props.isOpen}
          onClose={props.onClose}
          onSubmit={handleSubmit}
        >
          <input
            type="url"
            name="linkProfilePic"
            placeholder="Link"
            className="popup__input edit-profile__input-url"
            id="edit-profile-input"
            required
            ref={avatar}
          />
          <span className="edit-profile-input-error"></span>
        </PopupWithForm>
  )
}