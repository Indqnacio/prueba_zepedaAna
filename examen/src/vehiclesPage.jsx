import react from "react"
import axios from "axios"
import { useEffect, useState } from "react"
import TableData from "./tableData"
import VehiclesModal from "./modals/vehicles"
export default function VehiclesPage(){
    const [vehicles, setVehicles] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [modalMode, setModalMode] = useState('creating')
    const [selectedVehicle, setSelectedVehicle] = useState(null);
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
    const handleCreating = ()=>{
        setModalMode("creating")
        setSelectedVehicle(null)
        setIsModalOpen(true)
    }

    const handleEditing = (vehicle)=>{
        setModalMode("editing")
        setSelectedVehicle(vehicle)
        setIsModalOpen(true)
        console.log("se disparo handle editing")
    }
    const handleViewing = (vehicle)=>{
        setModalMode("viewing")
        setSelectedVehicle(vehicle)
        setIsModalOpen(true)
    }
    const handleDeleting = ()=>{
        
    }
    const handleSaving = async (datos)=>{
        console.log("MOdal mode ", modalMode)
        if(modalMode === "editing"){
            console.log("datos a actualizar ", datos)
            const res= await axios.put("http://localhost:3000/putVehiculo", datos)
            console.log(res)
        };
        alert("Pelicula actualizada con éxito")
        if(modalMode === "creating"){
            console.log("datos a postear ", datos)
           const res= await axios.post("http://localhost:3000/postVehiculo", datos)
           console.log(res)
        };
        fetchVehicles();
    }
    return(
        <>
        <h1>Página principal de Vehículos</h1>
         <button onClick={handleCreating}>Agregar Vehículo</button>
        <TableData columns={columns} data={vehicles} onView={handleViewing} onEdit={handleEditing}/>
         <div className="flex">
                
                <button disabled={index===1} className={"hover: cursor-pointer border "} onClick={prevPage}>Página Anterior</button>
                <button disabled={index===totalPages} className={"hover: cursor-pointer border"} onClick={nextPage}>Página Siguiente</button>
                <p>Página: {index}/{totalPages}</p>
        </div>
        <VehiclesModal isOpen={isModalOpen} mode={modalMode} onClose={()=>{setIsModalOpen(false); setSelectedVehicle(null)}} data={selectedVehicle} onSave={handleSaving}></VehiclesModal>
        </>
    )
}