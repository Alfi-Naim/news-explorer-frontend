import './Footer.css';
import githubIcon from '../../images/github.svg'
import linkedInIcon from '../../images/linkedin.svg'
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className='footer'>
            <p className='footer__credits'>© 2021 Supersite, Powered by News API</p>
            <nav className='footer__nav'>
                <div className='footer__link-container'>
                    <Link className='footer__link' to='/'>Home</Link>
                    <a className='footer__link' href='https://practicum.yandex.com' target="_blank">Practicum by Yandex</a>
                </div>
                <div className='footer__icon-container'>
                    <a className='footer__icon' href="https://github.com/Alfi-Naim" target="_blank"><img src={githubIcon} alt='github'></img></a>
                    <a className='footer__icon' href="https://www.linkedin.com/in/alfi-naim" target="_blank"><img src={linkedInIcon} alt='linkedIn'></img></a>
                </div>
            </nav>
        </footer>
    );
}

export default Footer;