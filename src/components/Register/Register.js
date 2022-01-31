import PopupWithForm from "../PopupWithForm/PopupWithForm";

function Register({ isOpen, onClose, onSubmit, onBottomLinkClick }) {

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            title="Sign up"
            submitTitle="Sign up"
            onSubmit={onSubmit}
            bottomLink="Sign in"
            bottomLinkText="or "
            onBottomLinkClick={onBottomLinkClick}>

            <label className="popup__form-field">Email</label>
            <input className="popup__input" type="email" id="register-email-input" name="email" placeholder="Enter email" required />
            <label className="popup__form-field">Password</label>
            <input className="popup__input" type="password" id="register-password-input" name="password" placeholder="Enter password" required />
            <label className="popup__form-field">Username</label>
            <input className="popup__input" type="text" id="register-username-input" name="username" placeholder="Enter your username" required />
            <p className="popup__error-text"></p>

        </PopupWithForm>
    );
}

export default Register;
