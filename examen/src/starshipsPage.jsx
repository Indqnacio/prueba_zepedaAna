import react from "react"
import axios from "axios"
import { useState, useEffect } from "react"
export default function StarshipsPage(){
    const [starships, setStarships] = useState([])

    async function fetchStarships(){
        const aux = await axios.get('http://localhost:3000/getNaves')
        setStarships(aux.data.docs)
    }
    useEffect(()=>{
        fetchStarships();
    },[])
    useEffect(()=>{
        console.log(starships)
    },[starships])
    return(
        <h1>Página principal de Naves</h1>
    )
}