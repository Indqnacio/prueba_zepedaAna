import react from "react"
import axios from "axios"
import { useEffect, useState } from "react"
export default function CharactersPage(){
    const [characters, setCharacters] = useState([])
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
        <h1>Página principal de Personajes</h1>
    )
}