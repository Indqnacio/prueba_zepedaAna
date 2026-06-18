import react from "react"
import axios from "axios"
import { useEffect, useState } from "react"
import TableData from "./tableData"
import VehiclesModal from "./modals/vehicles"
import ConfirmModal from "./confirmModal"
import Searchbar from "./searchbar"
import { Car,Plus, CircleChevronLeft, CircleChevronRight } from 'lucide-react';

export default function VehiclesPage(){
    const [vehicles, setVehicles] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [modalMode, setModalMode] = useState('creating')
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [toDeleteItem, setToDeleteItem] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
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
    const filteredData=vehicles.filter((item)=>{
        const query = searchQuery.toLocaleLowerCase();
        return(
            item.name.toLocaleLowerCase().includes(query)
        );
    });

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
    const handleDeleteOpen = (vehicle)=>{
        setIsConfirmOpen(true)
        setToDeleteItem(vehicle)

    }
    const handleDeleting = async()=>{
        try{
            const payload={
            id: `${toDeleteItem._id}`
            }
            console.log("data a enviar ", payload);
            const res = await axios.delete("http://localhost:3000/deleteVehiculo",{data:payload})
            console.log(res)
            setIsConfirmOpen(false);
            fetchVehicles();
        }catch(error){
            alert("Error al borrar elemento ", error)
            console.log("Error ", error);
        }
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
        <div className="w-full flex flex-col gap-6">
             <div className="flex inline-flex bg-gray-50 p-2 items-center rounded-2xl shadow-xl flex flex-row gap-1 text-lg gap-3 align-items-center">
                <Car/><h1 className="text-2xl font-semibold">Vehículos de Star Wars</h1>
            </div>
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
                    <Searchbar searchQuery={searchQuery} onSearchChange={setSearchQuery}/>
                    <div className="flex w-full justify-between">
                        <button onClick={handleCreating} 
                        className={"hover: cursor-pointer flex flex-row gap-1 rounded-full hover:bg-blue-800/20 bg-blue-200/50 p-3 text-blue-800"}> 
                        <Plus/>Agregar Vehículo</button>
                    </div>
            </div>
            <TableData columns={columns} data={filteredData} onView={handleViewing} onDelete={handleDeleteOpen} onEdit={handleEditing}/>
            <div className="flex items-center justify-end p-4 gap-3">
                <p className="font-medium">
                    Página <span className="text-slate-600">{index}</span>
                    de {" "} <span className="text-slate-600">{totalPages}</span>
                </p>
                <div className="flex gap-2">
                    <button disabled={index===1} 
                      className={"inline-flex items-center gap-1 bg-blue-200/50 hover:bg-blue-800/20 disabled:opacity-60 text-blue-800 cursor-pointer disabled:bg-blue-200/50 disabled:cursor-not-allowed p-2 rounded-xl"} 
                      onClick={prevPage}><CircleChevronLeft/>
                    </button>
                    <button disabled={index===totalPages} 
                    className={"inline-flex items-center gap-1 bg-blue-200/50 hover:bg-blue-800/20 disabled:opacity-60 text-blue-800 cursor-pointer disabled:bg-blue-200/50 disabled:cursor-not-allowed p-2 rounded-xl"} 
                        onClick={nextPage}><CircleChevronRight/>
                    </button>
                </div>

            </div>
            <VehiclesModal isOpen={isModalOpen} mode={modalMode} onClose={()=>{setIsModalOpen(false); setSelectedVehicle(null)}} data={selectedVehicle} onSave={handleSaving}></VehiclesModal>
        <ConfirmModal isOpen={isConfirmOpen} onClose={()=>{setIsConfirmOpen(false); setToDeleteItem("");}} message={`¿Desea eliminar el vehículo ${toDeleteItem.name}?`} onDelete={handleDeleting}></ConfirmModal>
        </div>
        
        
        </>
    )
}