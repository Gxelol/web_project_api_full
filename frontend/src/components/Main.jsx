import addIcon from "../images/Vectorplus.svg";
import editIcon from "../images/Vectoredit.svg";

import Card from "./Card";
import Footer from "./Footer";
import Header from "./Header";

import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from 'react';

export default function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <Header
        pathTo={'/signin'}
        registerLoginLink="Sair"
        loggedIn={props.loggedIn}
        onLogout={props.handleLogout}
        email={props.email}
      />
      <main className="content">
        <section className="profile">
          <img
            src={currentUser.avatar}
            alt="Foto de perfil"
            className="profile__image"
          />
          <div
            className="profile__edit-pic-button"
            onClick={props.onEditAvatarClick}
          ></div>
          <div className="profile__info">
            <div>
              <h1 className="profile__title">{currentUser.name}</h1>
              <p className="profile__text">{currentUser.about}</p>
            </div>

            <button
              className="profile__edit-button"
              onClick={props.onEditProfileClick}
            >
              <img src={editIcon} alt="Botão editar" />
            </button>
          </div>

          <button
            className="profile__add-button"
            onClick={props.isAddPlacePopupClick}
          >
            <img src={addIcon} alt="Botão adicionar" />
          </button>
        </section>

        <section className="elements">
          <h2 className="elements__title">Elements</h2>
          <ul className="elements__table elements__item">
            {props.cards.map((card) => (
              <Card
                card={card}
                key={card._id}
                onCardLike={props.handleCardLike}
                onCardClick={props.onCardClick}
                onCardDelete={props.handleDeleteCard}
              />
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
