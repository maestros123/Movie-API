import {MovieService} from "../../services/MovieService";
import './Pagination.scss'

export const Pagination = ( { movieData, setMovieData, formData, isSmallScreen }) => {
    const count = isSmallScreen ? 4 : 8

    const movieService = MovieService();

    const onPreviousPage = () =>{
        const startIndex = (movieData.sitePage - 2) * count;
        const endIndex = (movieData.sitePage - 1) * count;

        if (startIndex >= 0) {
            // Если индекс больше или равен нулю, страницы ещё есть
            const previousMovies = movieData.movies.slice(startIndex, endIndex);
            setMovieData(prevData => ({...prevData, displayedMovies: previousMovies, sitePage: movieData.sitePage - 1, resultCount: movieData.resultCount + count}))
        }
    }


    const onNextPage = () => {
        setMovieData(prevData => ({...prevData, loading: true}))
        const startIndex = movieData.sitePage * count;
        const endIndex = (movieData.sitePage + 1) * count;

        if (endIndex <= movieData.movies.length) {

            // Если в массиве есть еще элементы, отображаем следующую страницу
            const nextMovies = movieData.movies.slice(startIndex, endIndex);
            setMovieData(prevData => ({...prevData, displayedMovies: nextMovies, sitePage: movieData.sitePage + 1, loading: false}))
        } else {
            // Если все элементы уже отображены, делаем новый запрос на сервер
            if (movieData.call === 'find') {
                movieService.getSearchMovies(formData.title, movieData.apiPage)
                    .then((newMoviesList) => {
                        const { movies } = newMoviesList;
                        const combinedMovies = movieData.movies.concat(movies);
                        const nextMovies = combinedMovies.slice(startIndex, endIndex);
                        setMovieData(prevData => ({...prevData, movies: combinedMovies, displayedMovies: nextMovies, sitePage: movieData.sitePage + 1, apiPage: movieData.apiPage + 1, loading: false}))
                    });
            } else {
                movieService.getTopRatedMovies(movieData.apiPage)
                    .then((newMoviesList) => {
                        const { movie } = newMoviesList;
                        const combinedMovies = movieData.movies.concat(movie);
                        const nextMovies = combinedMovies.slice(startIndex, endIndex);
                        setMovieData(prevData => ({...prevData, movies: combinedMovies, displayedMovies: nextMovies, sitePage: movieData.sitePage + 1, apiPage: movieData.apiPage + 1, loading: false}))
                    });
            }
        }

        setMovieData(prevData => ({...prevData, resultCount: movieData.resultCount - count }))
    };
    const btnPrev = movieData.sitePage === 1 ? <button className="pagination__button__previous" disabled={true} onClick={onPreviousPage}>Предыдущая</button> : <button className="pagination__button__previous" onClick={onPreviousPage}>Предыдущая</button>
    const btnNext = movieData.resultCount - count < 0 ? <button className="pagination__button__next" disabled={true} onClick={onNextPage}>Cледующая</button> : <button className="pagination__button__next" onClick={onNextPage}>Cледующая</button>


    return (
        <div className="pagination__button">
            {btnPrev}
            {btnNext}
        </div>
    )
}
