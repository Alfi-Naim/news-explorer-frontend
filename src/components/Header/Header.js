import './Header.css';
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn, onSavePage, openSignIn, isMenuOpen, onSignoutClick, onMenuClick }) {
    return (
        <>
            <header className={`header ${isMenuOpen && "header__background_active"}`}>
                <div className={`header__container ${onSavePage && !isMenuOpen && "header__container_theme_dark"}`}>
                    <h2 className={`logo ${onSavePage && "logo_dark"}`}>NewsExplorer</h2>
                    <Navigation loggedIn={loggedIn} onSavePage={onSavePage} openSignIn={openSignIn} isMenuOpen={isMenuOpen} onSignoutClick={onSignoutClick}/>
                    <button className={`header__menu-button ${onSavePage && "header__menu-button_theme_dark"} ${isMenuOpen && "header__menu-button_active"}`} onClick={onMenuClick}></button>
                </div>
            </header>
        </>
    );
}

export default Header;