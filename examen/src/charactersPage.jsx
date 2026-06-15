import { useState, useEffect } from "react";
import axios from "axios";
import TableData from "./tableData";

export default function CharactersPage(){
    const [isPrevButtonDisabled, setIsPrevButtonDisabled]=useState(true)
    const [isNextButtonDisabled, setIsNextButtonDisabled]=useState(false)
    const [characters, setCharacters] = useState([])
    const [filteredCharacters, setFilteredCharacters] = useState([])
    const [totalPages, setTotalPages] = useState(0);
    const [index, setIndex]=useState(1);
    const columns = [
    {id: 'name', label: 'Nombre', minWidth:60 },
    {id: 'height', label: 'Altura', format: (value) => value.toFixed(2)},
    {id: 'mass', label: 'Peso', format: (value) => value.toFixed(2)},
    {id: 'skin_color', label: 'Color de Piel'},
    {id: 'hair_color', label: 'Color de Cabello'},
    {id: 'eye_color', label: 'Color de Ojos'},
    {id: 'birth_year', label: 'Fecha de Nacimiento'},
    {id: 'gender', label: 'Género'},
    {id: 'homeworld', label: 'Planeta de Nacimiento'},
]
    
    const fetchPersonajes = async() => {
        //console.log("index ",index)
        const res = await axios.get(`http://localhost:3000/getPersonajes?page=${index}&limit=10`);
        const datos = res.data.docs;
        //console.log("peticion en personaje de personajes ",datos);
        setTotalPages(res.data.totalPages)
        setCharacters(datos)
        setFilteredCharacters(datos);
        setTotalPages(res.data.totalPages)
    }
    useEffect(()=>{
        fetchPersonajes();
    },[index])
   /* useEffect(()=>{
        console.log("personajes recibidos ", characters);
        console.log("Total pages ", totalPages)
        console.log("isPrev disabled: ",isPrevButtonDisabled)
        console.log("isNext disabled: ",isNextButtonDisabled)
    },[characters])*/
    async function nextPage() {
        //console.log("indice antes de sumar ", index)
         setIndex(index+1)
        //console.log("index despues de sumar ", index)
        //await fetchPersonajes();
    }
    async function prevPage() {
        //console.log("indice antes de restar ", index)
         setIndex(index-1)
        //console.log("index despues de restar ", index)
       // await fetchPersonajes();
    }
   /* useEffect(()=>{
        console.log(index)
    },[index])*/
    return(
        <>
        <div>
            <h1>Personajes de Starwars</h1>
            {characters && characters.length>0?(
                <TableData columns={columns}data={characters}/>
            ):(
                <p>Cargando información...</p>
            )}
            <div className="flex">
                
                <button disabled={index===1} className={"hover: cursor-pointer border "} onClick={prevPage}>Página Anterior</button>
                <button disabled={index===totalPages} className={"hover: cursor-pointer border"} onClick={nextPage}>Página Siguiente</button>
                <p>Página: {index}/{totalPages}</p>
            </div>
        </div>

        </>
        
    )
}