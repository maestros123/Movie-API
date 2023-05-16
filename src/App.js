import './App.css';
import {MoviesList} from "./components/moviesList/MoviesList";
import {SearchForm} from "./components/searchForm/SearchForm";
import {useEffect, useState} from "react";
import {Pagination} from "./components/pagination/Pagination";

function App() {
    const [movieData, setMovieData] = useState({
        movies: [],
        displayedMovies: [],
        sitePage: 1,
        apiPage: 2,
        call: 'topRated',
        resultCount: 0,
        loading: true,
        notFound: false
    });

    const [formData, setFormData] = useState({
        title: "",
        genre: "",
        rating: "",
        year: ""
    });

    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        handleResize();
    }, []);




  return (
    <div className="App">
        <div className="container">
            <SearchForm setMovieData={setMovieData}
                        formData={formData}
                        setFormData={setFormData} isSmallScreen={isSmallScreen}/>
        </div>
        <div className="container">
            <MoviesList movieData={movieData} setMovieData={setMovieData}/>
            <Pagination movieData={movieData} setMovieData={setMovieData} formData={formData} isSmallScreen={isSmallScreen}/>
        </div>

    </div>
  );
}

export default App;
