import './About.css';
import personImage from '../../images/person.png'

function About() {
    return (
        <section className='about'>
            <img className='about__image' src={personImage} alt='current user'/>
            <div className='about__text-container'>
                <h2 className='about__title'>About the author</h2>
                <p className='about__info'>Hey there, I'm Alfi. I am a full stack developer with experience developing android applications.</p>
                <p className='about__info'>For the past three years Iv'e been deloping android apps, recently participated in Yandex's Practicum 100 program, where I fell in love with web development and decided to try to find my way there.</p>
            </div>
        </section>
    );
}

export default About;