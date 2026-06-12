import react from "react"
import axios from "axios"
import { useEffect, useState } from "react"

export default function PlanetsPage(){

    const [planets,setPlanets] = useState([])

    async function fetchPlanets(){
        const aux = await axios.get('http://localhost:3000/getPlanetas')
        setPlanets(aux.data.docs)
    }
    useEffect(()=>{
        fetchPlanets();
    },[])
    useEffect(()=>{
        console.log("planetas", planets)
    },[planets])

    return(
        <h1>Página principal de Planetas</h1>
    )
}