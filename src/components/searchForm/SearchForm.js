import './SearchForm.scss'
import burger from '../../resourses/img/burger.svg'
import {MovieService} from "../../services/MovieService";
import {useState} from "react";

export const SearchForm = ({ setMovieData, formData, setFormData, isSmallScreen }) => {

    const [burgerOpen, setBurgerOpen] = useState(false);

    const movieService = MovieService();

    const onSubmit = (e) => {
        e.preventDefault();
        setBurgerOpen(false)
        movieService.getSearchMovies(formData.title)
            .then(onMoviesLoaded)
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };


    const onMoviesLoaded = (newMoviesList) => {
        setMovieData(prevData => ({...prevData, sitePage: 1, call: 'find'}))
        const { movies, results } = newMoviesList;
        if (movies.length === 0) {
            setMovieData(prevData => ({...prevData, notFound: true}))
        } else {
            setMovieData(prevData => ({...prevData, notFound: false}))
        }
        setMovieData(prevData => ({...prevData, resultCount: results, movies: [...movies], displayedMovies: (movies.slice(0, 8))}))
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
                <form onSubmit={onSubmit}>
                    <input onChange={handleChange} className="search-form__input" required={true}
                           type="text" placeholder="поиск по названию"
                           name="title"
                           value={formData.title}/>
                    <select className="search-form__select-genre" name="genre" defaultValue="default" onChange={handleChange}>
                        <option value="default" disabled hidden>жанр</option>
                        <option value="18">Драма</option>
                        <option value="14">Комедия</option>
                        <option value="35">Фэнтези</option>
                    </select>
                    <select className="search-form__select-rating" name="rating" defaultValue="default" onChange={handleChange}>
                        <option value="default" disabled hidden>рейтинг</option>
                        <option value="all">8-9</option>
                        <option value="all">7-8</option>
                        <option value="all">6-7</option>
                    </select>
                    <select className="search-form__select-year" name="year" defaultValue="default" onChange={handleChange}>
                        <option value="default" disabled hidden>год</option>
                        <option value="all">2020 - 2023</option>
                        <option value="all">2010 - 2020</option>
                        <option value="all">2000 - 2010</option>
                        <option value="all">2000 - 2010</option>
                    </select>
                    <button className="search-form__button" onClick={onSubmit}>найти</button>
                </form>
            </div>
        </>

    )
}
