import react from "react"
import axios from "axios"
import { useEffect, useState } from "react"
import TableData from "./tableData"
export default function CharactersPage(){
    const [characters, setCharacters] = useState([])

    const columns = [
    {id: 'name', label: 'Nombre', minWidth:"10%" },
    {id: 'birth_year', label: 'Fecha de Nacimiento', minWidth:"10%"},
    {id: 'eye_color', label: 'Color de Ojos', minWidth:"10%"},
    {id: 'gender', label: 'Género', minWidth:"10%"},
    {id: 'hair_color', label: 'Color de Cabello', minWidth:"10%"},
    {id: 'height', label: 'Altura', minWidth:"10%"},
    {id: 'mass', label: 'Peso', minWidth:"10%"},
    {id: 'homeworld', label: 'Planeta', minWidth:"10%"}
]

    async function fetchCharacters() {
        const aux = await axios.get('http://localhost:3000/getPersonajes')
        setCharacters(aux.data.docs)
    }
    useEffect(()=>{
        fetchCharacters();
    },[])
    useEffect(()=>{
        console.log(characters)
    },[characters])
    return(
        <>
        <h1>Página principal de Personajes</h1>
        <TableData columns={columns} data={characters}/></>
        
    )
}