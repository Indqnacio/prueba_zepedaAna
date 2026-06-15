import react from "react"
import { useEffect, useState } from "react"
import axios from "axios";
import TableData from "./tableData";
export default function MoviesPage(){
    const [movies, setMovies] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [index, setIndex]=useState(1);
    const columns = [
    {id: 'title', label: 'Personaje', minWidth:"10%" },
    {id: 'director', label: 'Director', minWidth:"10%"},
    {id: 'producer', label: 'Productor', minWidth:"10%"},
    {id:'actions',label:'Acciones',minWidth:"10%"}
]
    async function getMovies(){
        const aux = await axios.get(`http://localhost:3000/getPelis?page=${index}&limit=10`)
        setMovies(aux.data.docs)
        setTotalPages(aux.data.totalPages)
    }
      useEffect(() => {
        getMovies();
    }, [index]);
    async function nextPage() {
         setIndex(index+1)
    }
    async function prevPage() {
         setIndex(index-1)
    }
    return(
        <>
            <h1>Página principal de Películas</h1>
            <TableData columns={columns} data={movies}></TableData>
            <div className="flex">
                <button disabled={index==1} className={"hover: cursor-pointer border "} onClick={prevPage}>Página Anterior</button>
                <button disabled={index==totalPages} className={"hover: cursor-pointer border"} onClick={nextPage}>Página Siguiente</button>
                <p>Página: {index}/{totalPages}</p>
            </div>
        </>
    )
}