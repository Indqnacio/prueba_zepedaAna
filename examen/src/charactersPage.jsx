import { useState, useEffect } from "react";
import axios from "axios";
import TableData from "./tableData";

export default function CharactersPage(){
    const [characters, setCharacters] = useState([])
    const [filteredCharacters, setFilteredCharacters] = useState([])
    const [totalPages, setTotalPages] = useState();
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
        const res = await axios.get('http://localhost:3000/getPersonajes');
        const datos = res.data.docs;
        console.log("peticion en personaje de personajes ",datos);
        setCharacters(datos)
        setFilteredCharacters(datos);
        setTotalPages(res.data.totalPages)
    }
    useEffect(()=>{
        fetchPersonajes();
    },[])
    useEffect(()=>{
        console.log("personajes recibidos ", characters);
    },[characters])

    return(
        <>
        <div>
            <h1>Personajes de Starwars</h1>
            {characters && characters.length>0?(
                <TableData columns={columns}data={characters}/>
            ):(
                <p>Cargando información...</p>
            )}
            
        </div>

        </>
        
    )
}