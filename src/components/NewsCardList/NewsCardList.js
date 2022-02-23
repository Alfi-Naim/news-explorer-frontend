import NewsCard from '../NewsCard/NewsCard';
import './NewsCardList.css';
import notFoundImg from "../../images/not-found.svg";

function NewsCardList({ searchStatus, cards, cardsCount, onMoreClick, loggedIn, onBookmarkClick, keyword, savedCards, onTrashClick, setIsSignupPopupOpen }) {

    if (searchStatus === "found" || cards.length > 0) {
        return (
            <section className='news-cards'>
                <div className='news-cards__container'>
                    <h2 className='news-cards__title'>Search results</h2>
                    <ul className="news-cards__card-list">
                        {cards.slice(0, cardsCount).map((cardItem, index) => (
                            <NewsCard setIsSignupPopupOpen={setIsSignupPopupOpen} savedCards={savedCards} card={cardItem} key={index} saved={false} onSavePage={false} loggedIn={loggedIn} onBookmarkClick={onBookmarkClick} keyword={keyword} onTrashClick={onTrashClick}/>
                        ))}
                    </ul>
                    {cardsCount < 100 && <button className='news-cards__more-btn' onClick={onMoreClick}>Show more</button>}
                </div>
            </section>
        )
    }
    else if (searchStatus === "loading") {
        return (
            <section className='news-cards'>
                {<div className='news-cards__container'>
                    <i className="circle-preloader"></i>
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
    }

    else if (searchStatus === "error") {
        return (
            <section className='news-cards'>
                <div className='news-cards__container'>
                    <p className="news-cards__error-text">Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later.</p>
                </div>
            </section >
        )
    };
    

    return "";
}

export default NewsCardList;