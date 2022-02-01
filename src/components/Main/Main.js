import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';
import './Main.css';

function Main({ onSearchClick, searchStatus }) {
    return (
        <>
            <section className='search'>
                <div className='search__container'>
                    <h1 className='search__title'>What's going on in the world?</h1>
                    <h2 className='search__subtitle'>Find the latest news on any topic and save them in your personal account.</h2>
                    <SearchForm onSearchClick={onSearchClick} />
                </div>
            </section>
            <NewsCardList searchStatus={searchStatus}/>
            <About />
        </>
    );
}

export default Main;