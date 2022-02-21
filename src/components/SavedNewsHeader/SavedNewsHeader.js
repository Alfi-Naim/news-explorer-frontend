import './SavedNewsHeader.css';

function SavedNewsHeader({ userName, cards }) {


    const keywords = [];

    cards.forEach((card) => {
        keywords.push(card.keyword);
    });

    const occurrences = keywords.reduce(function (acc, curr) {
        return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
    }, {});

    const sortedOccurrences = Object.keys(occurrences).sort((a, b) => occurrences[b] - occurrences[a]);

    const mostCommonKeywords =
        sortedOccurrences.length > 3
            ? `${sortedOccurrences.slice(0, 2).join(", ")}, and ${sortedOccurrences.length - 2} other`
            : sortedOccurrences.join(", ");

    return (
        <div className='saved-news__header'>
            <h2 className='saved-news__header-title'>Saved articles</h2>
            <p className='saved-news__article-count'>{userName}, you have {cards.length} saved articles</p>
            {cards.length > 0 && <p className='saved-news__keywords'><span className='saved-news__keywords-title'>By keywords:</span>{mostCommonKeywords}</p>}
        </div>
    );
}

export default SavedNewsHeader;