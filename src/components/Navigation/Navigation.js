import { Link } from "react-router-dom";
import React from "react";
import './Navigation.css';
import logoutImageLight from '../../images/logout-light.svg'
import logoutImageDark from '../../images/logout-dark.svg'
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Navigation({ loggedIn, onSavePage, openSignIn, onSignoutClick, isMenuOpen }) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <nav className={`header__nav ${isMenuOpen && "header__nav_opened"}`}>
            <Link to="/" className={`header__link ${!onSavePage && "header__link_active"}`}>Home</Link>
            {loggedIn ?
                (<><Link to="/saved-news" className={`header__link ${onSavePage && "header__link_active"}`}>Saved articles</Link>
                    <button className={`header__button header__button_logged ${onSavePage && "header__button_theme_dark"}`} onClick={onSignoutClick}>
                        {currentUser.name} <img src={onSavePage ? logoutImageDark : logoutImageLight} alt="logout"></img>
                    </button></>
                ) : (<button className={`header__button ${onSavePage && !isMenuOpen && "header__button_theme_dark"}`} onClick={openSignIn}>Sign in</button>)}
        </nav>
    );
}

export default Navigation;