import NewsCard from '../NewsCard/NewsCard';
import './NewsCardList.css';
import { cards } from "../../constants";
import notFoundImg from "../../images/not-found.svg";

function NewsCardList({ searchStatus }) {

    if (searchStatus === "found") {
        return (
            <section className='news-cards'>
                <div className='news-cards__container'>
                    <h2 className='news-cards__title'>Search results</h2>
                    <ul className="news-cards__card-list">
                        {cards.slice(0, 3).map(cardItem => (
                            <NewsCard card={cardItem} key={cardItem.id} saved={false} onSavePage={false} />
                        ))}
                    </ul>
                    <button className='news-cards__more-btn'>Show more</button>
                </div>
            </section>
        )
    }
    else if (searchStatus === "loading") {
        return (
            <section className='news-cards'>
                {<div className='news-cards__container'>
                    <i class="circle-preloader"></i>
                    <p className='news-cards__loading-title'>Searching for news...</p>
                </div>}
            </section>
        )
    }

    else if (searchStatus === "not-found") {
        return (
            <section className='news-cards'>
                <div className='news-cards__container'>
                    <img className='news-cards__not-found-image' src={notFoundImg} alt='nothing found :('></img>
                    <h2 className="news-cards__not-found-title">Nothing found</h2>
                    <p className="news-cards__not-found-text">Sorry, but nothing matched your search terms.</p>
                </div>
            </section >
        )
    };

    return "";
}

export default NewsCardList;