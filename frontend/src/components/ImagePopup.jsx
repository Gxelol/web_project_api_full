import closeIcon from "../images/CloseIconclose.svg";

export default function ImagePopup(props) {
  return (
    <div className={`image ${props.isOpen ? 'popup_active' : ''}`}>
    <button className="image__close-button" onClick={props.onClose}>
      <img src={closeIcon} alt="Botão fechar" />
    </button>
    <img
      src={props.isOpen ? props.card.link : ''}
      alt={props.isOpen ? props.card.name : ''}
      className="image__item"
    />
    <p className="image__description">{props.isOpen ? props.card.name : ''}</p>
  </div>
  );
}