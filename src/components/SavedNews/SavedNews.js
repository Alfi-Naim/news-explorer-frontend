import './SavedNews.css';
import NewsCard from '../NewsCard/NewsCard';

import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import { cards } from "../../constants";

function SavedNews({ userName }) {
    return (
        <section className='saved-news'>
            <SavedNewsHeader userName={userName} />
            <ul className="saved-news__card-list">
                {cards.map(cardItem => (
                    <NewsCard card={cardItem} key={cardItem.id} saved={true} onSavePage={true} />
                ))}
            </ul>
        </section>
    );
}

export default SavedNews;