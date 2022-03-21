import './NewsCard.css';

function NewsCard({ card, onSavePage, loggedIn, onBookmarkClick, onTrashClick, savedCards, setIsSigninPopupOpen }) {

    const saved = loggedIn && savedCards && savedCards.length > 0 && savedCards.find(savedCard => savedCard.title === card.title);

    function convertDateFormat(oldTime) {
        const oldDate = oldTime.slice(0, 10).split("-");
        const date = new Date(`${oldDate[1]}/${oldDate[2]}/${oldDate[0]}`);
        const month = date.toLocaleString("en-us", { month: "long" });
        return month + " " + date.getDate() + ", " + date.getFullYear();
    }

    function handleBookmarkClick() {
        onBookmarkClick(card);
    }

    function handleTrashClick() {
        onTrashClick(saved ? saved : card);
    }

    function openSignupPopup() {
        setIsSigninPopupOpen(true);
    }

    return (
        <li className="card">
            <button className={onSavePage ? 'card__trash' : saved ? 'card__bookmark card__bookmark_marked' : 'card__bookmark'} onClick={loggedIn ? saved ? handleTrashClick : handleBookmarkClick : openSignupPopup}></button>
            {onSavePage ?
                <div className='card__popup-container'>
                    <p className='card__popup-text'>Remove from saved</p>
                </div> :
                !loggedIn && <div className='card__popup-container'>
                    <p className='card__popup-text'>Sign in to save articles</p>
                </div>
            }
            <a className='card__link' href={card.url} target="_blank">
                {onSavePage ? <p className='card__keyword'>{card.keyword}</p> : ""}
                <img className="card__image" src={card.urlToImage} alt={card.title} />
                <div className="card__info">
                    <p className="card__date">{convertDateFormat(card.publishedAt)}</p>
                    <h2 className="card__title">{card.title}</h2>
                    <p className="card__text">{card.description}</p>
                    <p className="card__source">{card.source.name}</p>
                </div>
            </a>
        </li>
    );
}

export default NewsCard;