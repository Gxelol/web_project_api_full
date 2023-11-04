import closeIcon from "../images/CloseIconclose.svg";
import successIcon from "../images/verified.svg";
import errorIcon from "../images/not-verified.svg";

export default function InfoTooltip(props) {
  return (
    <>
      <div className={`tooltip ${props.name} ${props.isOpen ? 'tooltip_active' : ''}`}>
        <button className="tooltip__button" onClick={props.onClose}>
          <img src={closeIcon} alt="Botão fechar" />
        </button>

        <img src={props.isSuccess ? successIcon : errorIcon} alt="Ícone de sucesso ou erro" className='tooltip__image'/>
        <p className='tooltip__text'>{props.isSuccess ? 'Vitória! Você se registou com sucesso.' : props.tooltipMessage}</p>
      </div>
    </>
  );
}