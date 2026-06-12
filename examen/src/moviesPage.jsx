import react from "react"
import { useEffect, useState } from "react"
import axios from "axios";
export default function MoviesPage(){
    const [movies, setMovies] = useState([]);

    async function getMovies(){
        const aux = await axios.get('http://localhost:3000/getPelis')
        setMovies(aux.data.docs)
    }
      useEffect(() => {
        getMovies();
    }, []);
    useEffect(() => {
        console.log(movies);
    }, [movies]);
    return(
        <>
                <h1>Página principal de Películas</h1>
        {movies.forEach(movie=>{
            <p>{movie.title}</p>
        })}
        </>

    )
}