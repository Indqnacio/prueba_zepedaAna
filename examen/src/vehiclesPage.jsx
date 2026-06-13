import react from "react"
import axios from "axios"
import { useEffect, useState } from "react"
import TableData from "./tableData"
export default function VehiclesPage(){
    const [vehicles, setVehicles] = useState([])

    const columns = [
    {id: 'name', label: 'Nombre', minWidth:"10%" },
    {id: 'model', label: 'Modelo', minWidth:"10%"},
    {id: 'vehicle_class', label: 'Clase de Vehículo', minWidth:"10%"},
    {id: 'length', label: 'Tamaño', minWidth:"10%"},
    {id: 'passengers', label: 'Pasajeros', minWidth:"10%"},
    {id: 'max_atmosphering_speed', label: 'Máxima Velocidad Atmosférica', minWidth:"10%"},
    {id: 'cargo_capacity', label: 'Capacidad de Carga', minWidth:"10%"},
    {id: 'consumables', label: 'Consumibles', minWidth:"10%"},
    {id:'actions',label:'Acciones',minWidth:"10%"}
]
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
        <>
        <h1>Página principal de Vehículos</h1>
        <TableData columns={columns} data={vehicles}/>
        </>
    )
}