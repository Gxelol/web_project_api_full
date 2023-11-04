import closeIcon from "../images/CloseIconclose.svg";

export default function PopupWithForm(props) {
  return (
    <>
      <div className={`popup ${props.name} ${props.isOpen ? 'popup_active' : ''}`}>
        <h2 className="popup__title">{props.title}</h2>
        <button className="popup__close-button" onClick={props.onClose}>
          <img src={closeIcon} alt="Botão fechar" />
        </button>
        <form
          className={`popup__form ${props.formClass}`}
          name={props.formName}
          noValidate
        >
          <fieldset className="popup__set">
            {props.children}
            <button type="button" className={`popup__submit ${props.buttonClass}`} onClick={props.onSubmit}>
              {props.buttonText}
            </button>
          </fieldset>
        </form>
      </div>
    </>
  );
}
