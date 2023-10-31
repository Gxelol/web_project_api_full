import { useState, useEffect } from "react";
import { Redirect, Route, Switch, withRouter, useHistory } from "react-router-dom";

import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import AddPlacePopup from "./AddPlacePopup";
import InfoTooltip from "./InfoTooltip";

import api from "../utils/api";
import { checkToken } from "../utils/auth";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App(props) {
  //CARD
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState();

  //POPUP
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  //USER
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  //TOOLTIP
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState("");

  //NAVIGATE
  const navigate = useHistory();

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(!isImagePopupOpen);
  }

  function handleUpdateUser(name, about) {
    api.editProfile(name, about).then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    });
  }

  function handleUpdateAvatar(avatarLink) {
    api.editProfilePicture(avatarLink).then((data) => {
      setCurrentUser({ ...currentUser, avatar: data.avatar });
      closeAllPopups();
    });
  }

  function handleAddPlaceSubmit(cardName, cardLink) {
    api.addNewCard(cardName, cardLink).then((newCard) => {
      setCards([newCard, ...cards]);
    });
    closeAllPopups();
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
  }

  function closeTooltip() {
    setIsTooltipOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  useEffect(() => {
    function handleTokenCheck() {
      if (localStorage.getItem("jwt")) {
        const jwt = localStorage.getItem("jwt");
        checkToken(jwt).then((res) => {
          if (res) {
            setEmail(res.data.email);
            setLoggedIn(true);
            navigate.push("/home");
          } else {
            setLoggedIn(false);
          }
        });
      }
    }

    handleTokenCheck();
  }, [navigate]);

  function handleDeleteCard(card) {
    api.deleteCard(card._id);
    setCards((state) => state.filter((c) => c._id !== card._id));
  }

  function handleLogout() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  }

  useEffect(() => {
    api.getServerCards().then((card) => {
      setCards(card);
    });

    api.getUserInfo().then((user) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="container">
        <div
          className={`container__semitransparent 
        ${
          isImagePopupOpen ||
          isEditAvatarPopupOpen ||
          isEditProfilePopupOpen ||
          isAddPlacePopupOpen ||
          isTooltipOpen
            ? "container__semitransparent_active"
            : ""
        }`}
        ></div>

        <div className="page">
          <Switch>
            <Route path="/signin">
              <Login
              setEmail={setEmail}
                setLoggedIn={setLoggedIn}
                setIsTooltipOpen={setIsTooltipOpen}
                setTooltipMessage={setTooltipMessage}
                setSuccess={setSuccess}
              />
            </Route>

            <Route path="/signup">
              <Register
                setIsTooltipOpen={setIsTooltipOpen}
                setTooltipMessage={setTooltipMessage}
                setSuccess={setSuccess}
              />
            </Route>

            <Route path="/home">
              <ProtectedRoute loggedIn={loggedIn}>
                <Main
                  email={email}
                  handleLogout={handleLogout}
                  currentUser={currentUser}
                  cards={cards}
                  loggedIn={loggedIn}
                  onEditProfileClick={handleEditProfileClick}
                  onEditAvatarClick={handleEditAvatarClick}
                  isAddPlacePopupClick={handleAddPlaceClick}
                  handleCardLike={handleCardLike}
                  handleDeleteCard={handleDeleteCard}
                  onCardClick={handleCardClick}
                />
              </ProtectedRoute>
            </Route>

            <Route exact path="/">
              {loggedIn ? <Redirect to="/home" /> : <Redirect to="/signin" />}
            </Route>
          </Switch>
        </div>

        <InfoTooltip
          isSuccess={isSuccess}
          isOpen={isTooltipOpen}
          onClose={closeTooltip}
          tooltipMessage={tooltipMessage}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
