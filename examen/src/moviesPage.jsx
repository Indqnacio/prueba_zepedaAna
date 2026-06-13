import react from "react"
import { useEffect, useState } from "react"
import axios from "axios";
import './Movies.css'
import TableData from "./tableData";
export default function MoviesPage(){
    const [movies, setMovies] = useState([]);

    const columns = [
    {id: 'title', label: 'Personaje', minWidth:"10%" },
    {id: 'director', label: 'Director', minWidth:"10%"},
    {id: 'producer', label: 'Productor', minWidth:"10%"},
    {id:'actions',label:'Acciones',minWidth:"10%"}
]
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
        <TableData columns={columns} data={movies}></TableData>
        </>

    )
}