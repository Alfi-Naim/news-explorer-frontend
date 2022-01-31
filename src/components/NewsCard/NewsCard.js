import './NewsCard.css';

function NewsCard({ card, saved, onSavePage }) {
    return (
        <li className="card">
            <button className={onSavePage ? 'card__trash' : saved ? 'card__bookmark card__bookmark_marked' : 'card__bookmark'}></button>
            <div className='card__popup-container'>
                <p className='card__popup-text'>{saved ? 'Remove from saved' : 'Sign in to save articles'}</p>
            </div>
            {onSavePage ? <p className='card__keyword'>{card.keyword}</p> : "" }
            <img className="card__image" src={card.image} alt={card.title} />
            <div className="card__info">
                <p className="card__date">{card.date}</p>
                <h2 className="card__title">{card.title}</h2>
                <p className="card__text">{card.text}</p>
                <p className="card__source">{card.source}</p>
            </div>
        </li>
    );
}

export default NewsCard;