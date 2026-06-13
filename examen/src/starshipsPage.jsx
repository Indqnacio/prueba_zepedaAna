import react from "react"
import axios from "axios"
import { useState, useEffect } from "react"
import TableData from "./tableData"
export default function StarshipsPage(){
    const [starships, setStarships] = useState([])

    const columns = [
    {id: 'name', label: 'Nombre', minWidth:"10%" },
    {id: 'model', label: 'Modelo', minWidth:"10%"},
    {id: 'starship_class', label: 'Clase de Nave', minWidth:"10%"},
    {id: 'length', label: 'Tamaño', minWidth:"10%"},
    {id: 'passengers', label: 'Pasajeros', minWidth:"10%"},
    {id: 'max_atmosphering_speed', label: 'Máxima Velocidad Atmosférica', minWidth:"10%"},
    {id: 'hyperdrive_rating', label: 'Hyperdryve', minWidth:"10%"},
    {id: 'MGLT', label: 'MGLT', minWidth:"10%"},
    {id: 'cargo_capacity', label: 'Capacidad de Carga', minWidth:"10%"},
    {id: 'consumables', label: 'Consumibles', minWidth:"10%"},
    {id:'actions',label:'Acciones',minWidth:"10%"}
]
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
        <>
        <h1>Página principal de Naves</h1>
        <TableData columns={columns} data={starships}/>
        </>
    )
}