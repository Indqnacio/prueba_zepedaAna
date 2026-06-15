import react from "react"
import axios from "axios"
import { useEffect, useState } from "react"
import TableData from "./tableData"
import VehiclesModal from "./modals/vehicles"
export default function VehiclesPage(){
    const [vehicles, setVehicles] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [index, setIndex]=useState(1);

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
        const aux = await axios.get(`http://localhost:3000/getVehiculos?page=${index}&limit=10`)
        setVehicles(aux.data.docs)
         setTotalPages(aux.data.totalPages)
    }
    useEffect(()=>{
        fetchVehicles();
    },[index])
        async function nextPage() {
         setIndex(index+1)
    }
    async function prevPage() {
         setIndex(index-1)
    }
    return(
        <>
        <h1>Página principal de Vehículos</h1>
         <button onClick={()=>setIsModalOpen(true)}>Agregar Vehículo</button>
        <TableData columns={columns} data={vehicles}/>
         <div className="flex">
                
                <button disabled={index===1} className={"hover: cursor-pointer border "} onClick={prevPage}>Página Anterior</button>
                <button disabled={index===totalPages} className={"hover: cursor-pointer border"} onClick={nextPage}>Página Siguiente</button>
                <p>Página: {index}/{totalPages}</p>
        </div>
        <VehiclesModal isOpen={isModalOpen} onClose={()=>{setIsModalOpen(false); fetchVehicles()}}></VehiclesModal>
        </>
    )
}