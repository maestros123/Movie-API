import './MovieInfo.scss'
import {Spinner} from "../spinner/Spinner";

export const MovieInfo = ({movie, setSelectedMovie, setIsModalOpen}) => {

    const onCloseModal = () => {
        setSelectedMovie(null);
        setIsModalOpen(false);
    };

    const content = movie ? <>
        <div className="movie-info__img">
            <img src={movie.img} alt=""/>
            <span className="movie-info__rating">{movie.rating}</span>
        </div>
        <div className="movie-info__text">
            <h3 className="movie-info__title">{movie.title}</h3>
            <p className="movie-info__genres">{movie.genres}</p>
            <div className="movie-info__release">
                <p className="movie-info__year">{movie.year}</p>
                <p className="movie-info__time">{movie.time}</p>
            </div>
            <p className="movie-info__tagline">{movie.tagline}</p>
            <p className="movie-info__description">{movie.description}</p>
        </div>
    </>: null;

    const spinner = !movie ? <Spinner/> : null;

    return (
        <div className="movie-info">
            <div className="movie-info__content">
                <button className="movie-info__close" onClick={onCloseModal}></button>
                {spinner}
                {content}
            </div>
        </div>
    )
}
