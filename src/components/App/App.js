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
  const [cards, setCards] = useState(JSON.parse(localStorage.getItem("cards")));
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

  function handleSignup({ email, password, name }) {
    console.log("Register : " + email + " , " + password + " , " + name);
    auth.signup({ email, password, name })
      .then((res) => {
        if (res) {
          setIsSignupPopupOpen(false);
          setIsInfoPopupOpen(true);
        }
      }).catch((err) => {
        setSubmitError("User with this email address already exists");
      })
  }

  function handleSignin({ email, password }) {
    console.log("Login : " + email + " , " + password);
    auth.signin({ email, password })
      .then((res) => {
        console.log(res);
        localStorage.setItem("jwt", res.token);
        setToken(res.token);
        setLoggedIn(true);
        setIsSigninPopupOpen(false);
      })
      .catch((err) => {
        setSubmitError("Incorrect email or password");
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
    mainApi.deleteArticle(card._id).then((res) => {
      setSavedCards((cards) =>
        cards.filter((item) => item._id !== card._id)
      );
    })
  }

  function saveCard(card) {
    mainApi.saveArticle(card).then((res) => {
      console.log(res);
      setSavedCards([...savedCards, res]);
    });
    console.log(savedCards);
  }

  function handleBookmarkClick(card) {
    if (loggedIn) {
      const isSaved = isSavedCard(card.title);
      if (!isSaved) saveCard(card);
    }
  }

  function handleSearchClick(event) {
    event.preventDefault();
    setSearchStatus("loading");
    setCards([]);
    const searchedKeyword = event.target.searchInput.value;
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

  console.log("app");

  return (
    <div className="page">
      <div className="page-content">
        <CurrentUserContext.Provider value={currentUser}>
          <Switch>
            <ProtectedRoute path="/saved-news" loggedIn={loggedIn}>
              <Header
                loggedIn={loggedIn}
                onSavePage={true}
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
                loggedIn={loggedIn}
                onSavePage={false}
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
                setSubmitError={setSubmitError} />
              <Login
                isOpen={isSigninPopupOpen}
                onClose={closeAllPopups}
                onLogin={handleSignin}
                onBottomLinkClick={toggleSigningPopups}
                submitError={submitError}
                setSubmitError={setSubmitError} />
              <PopupWithForm
                isOpen={isInfoPopupOpen}
                onClose={closeAllPopups}
                title="Registration successfully completed!"
                bottomLink="Sign in"
                onBottomLinkClick={handleSigninClick} />
              <Main
                onSearchClick={handleSearchClick}
                searchStatus={searchStatus}
                onSavePage={false}
                cards={cards}
                cardsCount={cardsCount}
                loggedIn={loggedIn}
                onMoreClick={handleMoreBtnClick}
                onBookmarkClick={handleBookmarkClick}
                onTrashClick={deleteCard}
                savedCards={savedCards} />
              <Footer />
            </Route>
          </Switch>
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;