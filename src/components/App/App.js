import './App.css';
import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import Register from '../Register/Register';
import Login from '../Login/Login ';
import mainApi from "../../utils/MainApi";
import * as auth from "../../utils/auth";
import newsApi from '../../utils/NewsApi';
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute"

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("jwt"));
  const [cards, setCards] = useState(getCardsFromLocalStorage());
  const [savedCards, setSavedCards] = useState([]);
  const [cardsCount, setCardsCount] = useState(3);
  const [currentUser, setCurrentUser] = useState({ name: "", _id: "" });
  const [submitError, setSubmitError] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [keyword, setKeyword] = useState(localStorage.getItem("keyword"));
  const [isSignupPopupOpen, setIsSignupPopupOpen] = useState(false);
  const [isSigninPopupOpen, setIsSigninPopupOpen] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const closePopupByEscape = (evt) => {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    };

    document.addEventListener("keydown", closePopupByEscape);
    return () => document.removeEventListener("keydown", closePopupByEscape);
  }, []);

  useEffect(() => {
    const closePopupByOutsideClick = (evt) => {
      if (evt.target.classList.contains("popup")) {
        closeAllPopups();
      }
    };

    document.addEventListener("click", closePopupByOutsideClick);
    return () => document.removeEventListener("keydown", closePopupByOutsideClick);
  }, []);

  useEffect(() => {
    if (token) {
      mainApi.loadUserInfo(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setCurrentUser({ name: res.name, _id: res._id });
          }
        })
        .catch((err) => console.log(err));
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      mainApi.loadSavedArticles()
        .then((res) => {
          setSavedCards(res);
        })
        .catch((err) => console.log(err));
    }
  }, [token]);

  function handleSigninClick() {
    closeAllPopups();
    setIsSigninPopupOpen(true);
  }

  function handleMenuClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  function getCardsFromLocalStorage() {
    const loadedCards = localStorage.getItem("cards");
    if (loadedCards == null) return [];
    else return JSON.parse(loadedCards);
  }

  function handleSignup({ email, password, name }) {
    setIsPending(true);
    auth.signup({ email, password, name })
      .then((res) => {
        if (res) {
          setIsSignupPopupOpen(false);
          setIsInfoPopupOpen(true);
        }
      }).catch((err) => {
        setSubmitError("User with this email address already exists");
      }).finally(() =>{
        setIsPending(false);
      });
  }

  function handleSignin({ email, password }) {
    setIsPending(true);
    auth.signin({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setToken(res.token);
        setLoggedIn(true);
        setIsSigninPopupOpen(false);
      })
      .catch((err) => {
        setSubmitError("Incorrect email or password");
      }).finally(() =>{
        setIsPending(false);
      });
  }

  function handleSignout() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setCurrentUser({ name: "", _id: "" })
    setToken("");
    closeAllPopups();
  }

  function toggleSigningPopups() {
    setIsSigninPopupOpen(!isSigninPopupOpen);
    setIsSignupPopupOpen(!isSignupPopupOpen);
  }

  function isSavedCard(cardTitle) {
    return savedCards.length > 0 && savedCards.find(card => card.title === cardTitle);
  }

  function deleteCard(card) {
    mainApi.deleteArticle(card._id).then(() => {
      setSavedCards((cards) =>
        cards.filter((item) => item._id !== card._id)
      )
    }).catch((err) => console.log(err));
  }

  function saveCard(card) {
    mainApi.saveArticle(card).then((res) => {
      setSavedCards([...savedCards, res]);
    }).catch((err) => console.log(err));
  }

  function handleBookmarkClick(card) {
    if (loggedIn) {
      const isSaved = isSavedCard(card.title);
      if (!isSaved) saveCard(card);
    }
  }

  function handleSearchClick({ searchedKeyword }) {
    setIsPending(true);
    setSearchStatus("loading");
    setCards([]);
    newsApi.loadArticles(searchedKeyword).then((data) => {
      if (data.articles.length == 0) {
        setSearchStatus("not-found");
      } else {
        setKeyword(searchedKeyword);
        data.articles.forEach((card) => {
          card.keyword = searchedKeyword;
        });
        setCards(data.articles);
        localStorage.setItem("cards", JSON.stringify(data.articles));
        setSearchStatus("found");
      }
    }).catch(() => {
      setSearchStatus("error");
    }).finally(() => {
      setIsPending(false)
    });
  }

  function handleMoreBtnClick() {
    setCardsCount(cardsCount + 3);
  }

  function closeAllPopups() {
    setIsSignupPopupOpen(false);
    setIsSigninPopupOpen(false);
    setIsInfoPopupOpen(false);
    setIsMenuOpen(false);
  }

  return (
    <div className="page">
      <div className="page-content">
        <CurrentUserContext.Provider value={currentUser}>
          <Switch>
            <ProtectedRoute path="/saved-news" loggedIn={loggedIn}>
              <Header
                setIsMenuOpen={setIsMenuOpen}
                loggedIn={loggedIn}
                isMenuOpen={isMenuOpen}
                onSignoutClick={handleSignout}
                onMenuClick={handleMenuClick} />
              <SavedNews
                loggedIn={loggedIn}
                cards={savedCards}
                onTrashClick={deleteCard} />
              <Footer />
            </ProtectedRoute>
            <Route path="/">
              <Header
                setIsMenuOpen={setIsMenuOpen}
                loggedIn={loggedIn}
                isMenuOpen={isMenuOpen}
                onSignoutClick={handleSignout}
                onMenuClick={handleMenuClick}
                openSignIn={handleSigninClick} />
              <Register
                isOpen={isSignupPopupOpen}
                onClose={closeAllPopups}
                onRegister={handleSignup}
                onBottomLinkClick={toggleSigningPopups}
                submitError={submitError}
                setSubmitError={setSubmitError} 
                isPending={isPending}/>
              <Login
                isOpen={isSigninPopupOpen}
                onClose={closeAllPopups}
                onLogin={handleSignin}
                onBottomLinkClick={toggleSigningPopups}
                submitError={submitError}
                setSubmitError={setSubmitError}
                isPending={isPending} />
              <PopupWithForm
                isOpen={isInfoPopupOpen}
                onClose={closeAllPopups}
                title="Registration successfully completed!"
                bottomLink="Sign in"
                onBottomLinkClick={handleSigninClick} />
              <Main
                onSearchClick={handleSearchClick}
                searchStatus={searchStatus}
                cards={cards}
                cardsCount={cardsCount}
                loggedIn={loggedIn}
                onMoreClick={handleMoreBtnClick}
                onBookmarkClick={handleBookmarkClick}
                onTrashClick={deleteCard}
                savedCards={savedCards}
                setIsSigninPopupOpen={setIsSigninPopupOpen}
                isPending={isPending} />
              <Footer />
            </Route>
          </Switch>
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;