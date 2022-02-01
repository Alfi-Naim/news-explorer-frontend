import PopupWithForm from "../PopupWithForm/PopupWithForm";

function Login({ isOpen, onClose, onSubmit, onBottomLinkClick }) {

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            title="Sign in"
            submitTitle="Sign in"
            onSubmit={onSubmit}
            bottomLink="Sign up"
            bottomLinkText="or "
            onBottomLinkClick={onBottomLinkClick}>

            <label className="popup__form-field">Email</label>
            <input className="popup__input popup__input_place_login" type="email" id="login-email-input" name="email" placeholder="Enter email" required />
            <p className="popup__error-text popup__error-text_place_login"></p>

            <label className="popup__form-field">Password</label>
            <input className="popup__input popup__input_place_login" type="password" id="login-password-input" name="password" placeholder="Enter password" required />
            <p className="popup__error-text popup__error-text_place_login"></p>

        </PopupWithForm>


    );
}

export default Login;
