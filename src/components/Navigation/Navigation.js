import { Link, useLocation } from "react-router-dom";
import React from "react";
import './Navigation.css';
import logoutImage from '../../images/logout.svg'
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Navigation({ loggedIn, openSignIn, onSignoutClick, isMenuOpen, setIsMenuOpen }) {

    const currentUser = React.useContext(CurrentUserContext);
    const location = useLocation();

    let onSavePage = location.pathname !== '/';
    
    function handleLinkClick() {
        setIsMenuOpen(false);
    }

    return (
        <nav className={`header__nav ${isMenuOpen && "header__nav_opened"}`}>
            <Link to="/" className={`header__link ${!onSavePage && "header__link_active"}`} onClick={handleLinkClick}>Home</Link>
            {loggedIn ?
                (<><Link to="/saved-news" className={`header__link ${onSavePage && "header__link_active"}`} onClick={handleLinkClick}>Saved articles</Link>
                    <button className={`header__button header__button_logged`} onClick={onSignoutClick}>
                        {currentUser.name} <img src={logoutImage} alt="logout"></img>
                    </button></>
                ) : (<button className={`header__button ${onSavePage && !isMenuOpen && "header__button_theme_dark"}`} onClick={openSignIn}>Sign in</button>)}
        </nav>
    );
}

export default Navigation;