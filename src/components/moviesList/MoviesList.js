import {MovieService} from "../../services/MovieService";
import {useEffect, useState} from "react";
import './MoviesList.scss'
import notFound from '../../resourses/img/not-found.png'
import {MovieInfo} from "../movieInfo/MovieInfo";
import {Spinner} from "../spinner/Spinner";

export const MoviesList = ({ movieData, setMovieData }) => {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const count = window.innerWidth <= 768 ? 4 : 8

    const movieService = MovieService();

    useEffect(() => {
        setMovieData(prevData => ({...prevData, loading: true}))
        movieService.getTopRatedMovies()
            .then(onMoviesLoaded);
    }, []);

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isModalOpen]);

    const onMoviesLoaded = (newMoviesList) => {
        const { movies, results } = newMoviesList;
        setMovieData(prevData => ({...prevData, resultCount: results, movies: movies, displayedMovies: movies.slice(0, count)}))
        setMovieData(prevData => ({...prevData, loading: false}))
    };

    const openModal = (movie) => {
        setIsModalOpen(true);
        movieService.getMovie(movie.id)
            .then(setSelectedMovie);
    };

    const content = !movieData.loading ? <div className="movies-list">
        {movieData.displayedMovies.map((movie, index) => (
            <div className="movies-list__item" key={index} onClick={() => openModal(movie)}>
                <div className="movies-list__wrapper">
                    <img src={movie.img} alt="" />
                    <h3>{movie.title}</h3>
                    <p>{movie.year}</p>
                    <span className="movies-list__rating">{movie.rating}</span>
                </div>
            </div>
        ))}
    </div> : null;

    const noContent = movieData.notFound ? <div className="no-found">
        <h3>Ничего не найдено</h3>
        <img src={notFound} alt=""/>
    </div>: null

    const spinner = movieData.loading ? <Spinner/> : null;

    return (
        <>
            {spinner}
            {noContent}
            {content}
            {isModalOpen && (
                <MovieInfo
                    movie={selectedMovie}
                    setSelectedMovie={setSelectedMovie}
                    setIsModalOpen={setIsModalOpen}
                />
            )}
        </>
    );
}
