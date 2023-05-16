import noImage from '../resourses/img/no-image.png'

export const MovieService = () => {
    const _apiKey = '###';

    const getResourse = async (url) => {
        const res = await fetch(url);

        // if (!res.ok) {
        //     throw new Error(`Could not fetch ${url}, status ${res.status}`);
        // }

        return await res.json();
    }

    const getTopRatedMovies = async (page = 1) => {
        const res = await getResourse(`https://api.themoviedb.org/3/movie/top_rated?${_apiKey}&language=ru-RU&page=${page}`)
        const movie = res.results.map(transformMovie);
        const results = res.total_results;

        return {movie, results}
    }

    const getSearchMovies = async (str, page = 1) => {
        const res = await getResourse(`https://api.themoviedb.org/3/search/movie?${_apiKey}&language=ru-RU&page=${page}&query="${str}"`)


        const movies = res.results.map(transformMovie);
        const results = res.total_results;

        return {movies, results}

    }

    const getMovie = async (id) => {
        const res = await getResourse(`https://api.themoviedb.org/3/movie/${id}?${_apiKey}&language=ru-RU`);

        const year = res.release_date.slice(0,4);
        const urlImg = res.poster_path ? 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + res.poster_path : noImage;

        const genreNames = res.genres.map(genre => genre.name);
        const genres = genreNames.join(", ");

        const tagline = res.tagline ? res.tagline : '«—»'

        const hours = Math.floor(res.runtime / 60);
        const minutes = res.runtime % 60;
        const hoursText = hours === 1 ? 'час' : hours > 1 && hours < 5 ? 'часа' : 'часов'
        const minutesText = minutes === 1 ? 'минута' : minutes > 1 && minutes < 5 ? 'минуты' : 'минут'


        const time = `${hours} ${hoursText} ${minutes} ${minutesText}`

        return {
            title: res.title,
            genres: genres.charAt(0).toUpperCase() + genres.slice(1),
            img: urlImg,
            year: year,
            tagline : tagline,
            description: res.overview,
            rating: res.vote_average.toFixed(1),
            time: time
        }
    }

    const transformMovie = (movie) => {
        const year = movie.release_date.slice(0,4);
        const urlImg = movie.poster_path ? 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + movie.poster_path : noImage;


        return {
            id: movie.id,
            title: movie.title,
            img: urlImg,
            year: year,
            rating: movie.vote_average.toFixed(1)
        }
    }

    return {getTopRatedMovies, getSearchMovies, getMovie}

}
