import trashIcon from "../images/Trashclose.svg";
import emptyHeartIcon from "../images/VectorheartEmpty.svg";
import fullHeartIcon from "../images/VectorheartFull.svg";

import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { useContext } from 'react';

export default function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const card = props.card;

  // Verifying if current user is the current object owner 
  const isOwn = card.owner._id === currentUser._id;

  // Verifies if the card was liked by current user
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  function handleClick() {
    props.onCardClick(card);
  }
  
  function handleLikeClick() {
    props.onCardLike(card);
  }
  
    function handleCardDelete() {
      props.onCardDelete(card);
    }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div id="card__div">
        <li className="element" id="">
          <img
            src={card.link}
            alt={card.name}
            onClick={handleClick}
            className="element__image"
          />
          <button className="element__delete" onClick={handleCardDelete} style={{display: isOwn ? "" : 'none'}}>
            <img src={trashIcon} alt="Botão lixeira" />
          </button>
          <div className="element__description">
            <p className="element__title">{card.name}</p>
            <div className="element__button-container">
              <button className="element__like" onClick={handleLikeClick}>
                <img src={isLiked ? fullHeartIcon : emptyHeartIcon} alt="Botão curtir" />
              </button>
              <p className="element__counter">{card.likes.length}</p>
            </div>
          </div>
        </li>
      </div>
    </CurrentUserContext.Provider>
  );
}
