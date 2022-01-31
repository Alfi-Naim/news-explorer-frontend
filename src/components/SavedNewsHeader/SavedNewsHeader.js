import './SavedNewsHeader.css';

function SavedNewsHeader({ loggedIn, userName }) {
    return (
        <div className='saved-news__header'>
            <h2 className='saved-news__header-title'>Saved articles</h2>
            <p className='saved-news__article-count'>{userName}, you have 5 saved articles</p>
            <p className='saved-news__keywords'><span className='saved-news__keywords-title'>By keywords:</span>Nature, Yellowstone, and 2 other</p>
        </div>
    );
}

export default SavedNewsHeader;