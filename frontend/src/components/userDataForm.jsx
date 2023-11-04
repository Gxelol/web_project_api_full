import { NavLink } from 'react-router-dom';

export default function UserDataForm(props) {
  return (
    <>
      <div className={`auth`}>
        <h2 className="auth__title">{props.title}</h2>
        <form
          className={`auth__form`}
          name={props.formName}
          noValidate
          onSubmit={props.handleSubmit}
        >
          <fieldset className="auth__set">
            {props.children}
            <button 
            type="button" 
            className={`auth__submit`}
            onClick={props.handleSubmit}
            >
              {props.buttonText}
            </button>
            <NavLink className='auth__link' to={props.pathTo}>{props.linkText}</NavLink> 
          </fieldset>
        </form>
      </div>
    </>
  );
}