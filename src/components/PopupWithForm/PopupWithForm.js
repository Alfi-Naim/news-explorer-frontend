import './PopupWithForm.css';

function PopupWithForm({
    title,
    isOpen,
    onClose,
    submitTitle,
    onSubmit,
    bottomLink,
    bottomLinkText,
    onBottomLinkClick,
    children,
    isValid
}) {

    return (
        <div className={`popup ${isOpen && "popup_opened"}`}>
            <div className="popup__form-container">
                <form className="popup__form" onSubmit={onSubmit}>
                    <button className="popup__close-icon" type="button" onClick={onClose} />
                    <h2 className="popup__title">{title}</h2>
                    {children}
                    {submitTitle && <button className={`popup__button ${"popup__button_disable"}`} disabled={!isValid} type="submit">{submitTitle}</button>}
                    <div className={`popup__bottom-text-container ${bottomLinkText && "popup__bottom-text-container_place_center"}`}>
                        <p className="popup__bottom-text">{bottomLinkText}</p>
                        <button className={`popup__bottom-text popup__bottom-link ${!bottomLinkText && "popup__bottom-text_size_big"}`} type='button' onClick={onBottomLinkClick}>{bottomLink}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;
