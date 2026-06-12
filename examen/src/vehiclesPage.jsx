import react from "react"
import axios from "axios"
import { useEffect, useState } from "react"
export default function VehiclesPage(){
    const [vehicles, setVehicles] = useState([])

    async function fetchVehicles() {
        const aux = await axios.get('http://localhost:3000/getVehiculos')
        setVehicles(aux.data.docs)
    }
    useEffect(()=>{
        fetchVehicles();
    },[])
    useEffect(()=>{
        console.log("vehicles ",vehicles)
    },[vehicles])
    return(
        <h1>Página principal de Vehículos</h1>
    )
}