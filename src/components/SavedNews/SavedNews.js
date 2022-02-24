import React from "react";

import './SavedNews.css';
import NewsCard from '../NewsCard/NewsCard';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SavedNews({ loggedIn , cards, onTrashClick}) {
    
    const currentUser = React.useContext(CurrentUserContext);

    function formatCard(card){
        return {
            keyword: card.keyword,
            title: card.title,
            publishedAt: card.date,
            description : card.text,
            source: { name: card.source },
            url: card.link,
            urlToImage: card.image,
            _id: card._id
          };
    }

    return (
        <section className='saved-news'>
            <SavedNewsHeader userName={currentUser.name} cards={cards} />
            {cards && cards.length > 0 && <ul className="saved-news__card-list">
                {cards.map((cardItem, index) => (
                    <NewsCard card={formatCard(cardItem)} key={index} saved={true} onSavePage={true} onTrashClick={onTrashClick} savedCards={cards} loggedIn={loggedIn} />
                ))}
            </ul>}
        </section>
    );
}

export default SavedNews;