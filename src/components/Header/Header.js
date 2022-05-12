import { useLocation } from "react-router-dom";
import './Header.css';
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn, openSignIn, isMenuOpen, onSignoutClick, onMenuClick, setIsMenuOpen }) {

    const location = useLocation();
    let onSavePage = location.pathname !== '/';

    return (
        <>
            <header className='header'>
                <div className={`header__container ${onSavePage && "header__container_theme_dark"}`}>
                    <h2 className='logo'>NewsExplorer</h2>
                    <Navigation setIsMenuOpen={setIsMenuOpen} loggedIn={loggedIn} onSavePage={onSavePage} openSignIn={openSignIn} isMenuOpen={isMenuOpen} onSignoutClick={onSignoutClick}/>
                    <button className={`header__menu-button ${isMenuOpen && "header__menu-button_active"}`} onClick={onMenuClick}></button>
                </div>   
            </header>
        </>
    );
}
export default Header;