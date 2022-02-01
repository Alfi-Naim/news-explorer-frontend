import './App.css';
import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import Register from '../Register/Register';
import Login from '../Login/Login ';


function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("Lidar");
  const [searchStatus, setSearchStatus] = useState("");
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

  function handleSignupClick() {
    setIsSignupPopupOpen(true);
  }

  function handleSigninClick() {
    closeAllPopups();
    setIsSigninPopupOpen(true);
  }

  function handleSignin() {
    //TODO
  }

  function handleMenuClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  function handleSignup() {
    //TODO
    setIsInfoPopupOpen(true);
  }

  function toggleSigningPopups() {
    setIsSigninPopupOpen(!isSigninPopupOpen);
    setIsSignupPopupOpen(!isSignupPopupOpen);
  }

  function handleSearchClick(event) {
    event.preventDefault();
    setSearchStatus("found"); //TEST
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
        <Switch>
          <Route path="/saved-news">
            <Header
              loggedIn={loggedIn}
              userName={username}
              onSavePage={true} 
              isMenuOpen={isMenuOpen}
              onMenuClick={handleMenuClick}/>
            <SavedNews
              userName={username} />
            <Footer />
          </Route>
          <Route path="/">
            <Header
              loggedIn={loggedIn}
              userName={username}
              onSavePage={false}
              isMenuOpen={isMenuOpen}
              onMenuClick={handleMenuClick}
              openSignIn={handleSigninClick} />
            <Register
              isOpen={isSignupPopupOpen}
              onClose={closeAllPopups}
              onSubmit={handleSignup}
              onBottomLinkClick={toggleSigningPopups}/>
            <Login
              isOpen={isSigninPopupOpen}
              onClose={closeAllPopups} 
              onSubmit={handleSignin}
              onBottomLinkClick={toggleSigningPopups}/>
            <PopupWithForm
              isOpen={isInfoPopupOpen}
              onClose={closeAllPopups}
              title="Registration successfully completed!"
              bottomLink="Sign in" 
              onBottomLinkClick={handleSigninClick}/>
            <Main
              onSearchClick={handleSearchClick}
              searchStatus={searchStatus}
              onSavePage={false} />
            <Footer />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;