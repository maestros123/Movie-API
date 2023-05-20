import './SearchForm.scss'
import burger from '../../resourses/img/burger.svg'
import {MovieService} from "../../services/MovieService";
import {useState} from "react";

export const SearchForm = ({ setMovieData, formData, setFormData, isSmallScreen, movieData}) => {
    const count = isSmallScreen ? 4 : 8
    const [burgerOpen, setBurgerOpen] = useState(false);

    const movieService = MovieService();


    const onSubmit = (e) => {
        e.preventDefault();
        setBurgerOpen(false)
        movieService.getSearchMovies(formData.title)
            .then(onMoviesLoaded)

        setMovieData(prevData => ({...prevData, sitePage: 1, call: 'find'}))
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };


    const onMoviesLoaded = (newMoviesList) => {
        const { movies, results } = newMoviesList;

        if (movies.length === 0) {
            setMovieData(prevData => ({...prevData, notFound: true}))
        } else {
            setMovieData(prevData => ({...prevData, notFound: false}))
        }
        setMovieData(prevData => ({...prevData, resultCount: results, movies: [...movies], displayedMovies: (movies.slice(0, count))}))
    }

    function handleClick(call) {
        movieService.getTopRatedMovies(1, call)
            .then(onMoviesLoaded);

        setMovieData(prevData => ({...prevData, sitePage: 1, call: call}))
    }


    function toggleMenu() {
        setBurgerOpen(!burgerOpen)
    }

    const burgerMenu = isSmallScreen ? <div className="burger-menu">
                                    <img src={burger} className={`burger-menu__icon ${burgerOpen ? "open" : ""}`} onClick={toggleMenu}/>
                                </div> : null




    return (
        <>{burgerMenu}
            <div className={!isSmallScreen ? "search-form" : burgerOpen ? "search-form search-form__small open" : "search-form search-form__small"}>
                <h2 className="logo">MovieBase</h2>
                <form onSubmit={onSubmit}>
                    <input onChange={handleChange} className="search-form__input" required={true}
                           type="text" placeholder="поиск по названию"
                           name="title"
                           value={formData.title}/>

                </form>
                <ul>
                    <li onClick={() => handleClick('now_playing')}>Сейчас в кино</li>
                    <li onClick={() => handleClick('popular')}>Популярное сейчас</li>
                    <li onClick={() => handleClick('top_rated')}>Высокий рейтинг</li>
                </ul>
            </div>
        </>

    )
}
