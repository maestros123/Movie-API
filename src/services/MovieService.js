import {useState} from "react";


export const MovieService = () => {
    const _apiKey = 'api_key=655f10783fc5a0bc72ed790cedad3b72';

    const getResourse = async (url) => {
        const res = await fetch(url);

        // if (!res.ok) {
        //     throw new Error(`Could not fetch ${url}, status ${res.status}`);
        // }

        return await res.json();
    }

    const getTopRatedMovies = async (page = 1) => {
        const res = await getResourse(`https://api.themoviedb.org/3/movie/top_rated?${_apiKey}&language=ru-RU&page=${page}`)
        return res.results.map(transformMovie)
    }

    const getMovies = async (request, option, page = 1) => {
        const res = await getResourse(`https://api.themoviedb.org/3/${request}${_apiKey}${option}&page=${page}`)
        return res.results.map(transformMovie)
    }


    const getSearchMovies = async (str) => {
        const res = await getResourse(`https://api.themoviedb.org/3/search/movie?${_apiKey}&language=ru-RU&page=1&query="${str}"`)
        return res.results.map(transformMovie)
    }

    const transformMovie = (movie) => {
        const urlImg = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + movie.poster_path;
        const year = movie.release_date.slice(0,4);

        return {
            id: movie.id,
            title: movie.title,
            description: movie.overview,
            img: urlImg,
            year: year,
            rating: movie.vote_average
        }
    }

    return {getTopRatedMovies, getSearchMovies, getMovies}

}
