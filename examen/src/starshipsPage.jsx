import react from "react"
import axios from "axios"
import { useState, useEffect } from "react"
import TableData from "./tableData"
import StarshipsModal from "./modals/starships"
import ConfirmModal from "./confirmModal"
import Searchbar from "./searchbar"
import AlertPopUp from "./alertPopUp";
import { Rocket,Plus, CircleChevronLeft, CircleChevronRight } from 'lucide-react';
export default function StarshipsPage(){
    const [starships, setStarships] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [index, setIndex]=useState(1);
    const [modalMode, setModalMode] = useState('creating')
    const [selectedStarship, setSelectedStarship] = useState(null);
    const [toDeleteItem, setToDeleteItem] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notificationType, setNotificationType] = useState("");
    const [notificationMessage, setNotificationMessage] = useState("");

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
        const aux = await axios.get(`http://localhost:3000/getNaves?page=${index}&limit=10`)
        setStarships(aux.data.docs)
        setTotalPages(aux.data.totalPages)
    }
    useEffect(()=>{
        fetchStarships();
    },[index])
    async function nextPage() {
        setIndex(index+1)
    }
    async function prevPage() {
        setIndex(index-1)
    }
    const launchAlert = (type, message)=>{
        setIsNotificationOpen(true);
        setNotificationMessage(message);
        setNotificationType(type)
    }
    const handleCreating = ()=>{
        setModalMode("creating")
        setSelectedStarship(null)
        setIsModalOpen(true)
    }

    const handleEditing = (starship)=>{
        setModalMode("editing")
        setSelectedStarship(starship)
        setIsModalOpen(true)
        //console.log("se disparo handle editing")
    }
    const handleViewing = (starship)=>{
        setModalMode("viewing")
        setSelectedStarship(starship)
        setIsModalOpen(true)
    }
    const handleDeleteOpen = (starship)=>{
        setIsConfirmOpen(true)
        setToDeleteItem(starship)

    }
    const filteredData=starships.filter((item)=>{
        const query = searchQuery.toLocaleLowerCase();
        return(
            item.name.toLocaleLowerCase().includes(query)
        );
    });
    const handleDeleting = async()=>{
        try{
            const payload={
            id: `${toDeleteItem._id}`
            }
            console.log("data a enviar ", payload);
            const res = await axios.delete("http://localhost:3000/deleNave",{data:payload})
            console.log(res)
            setIsConfirmOpen(false);
            fetchStarships();
        }catch(error){
            alert("Error al borrar elemento ", error)
            console.log("Error ", error);
        }
    }
    const handleSaving = async (datos)=>{
        try{
            if(modalMode === "editing"){
                const res= await axios.put("http://localhost:3000/putNave", datos)
            };
            if(modalMode === "creating"){
                const res= await axios.post("http://localhost:3000/postNave", datos)
            };
            launchAlert("isSuccess","Cambios realizados con éxito.")
            setIsModalOpen(false);
            fetchStarships();
        } catch(error){
            const MessageErrorBackend = error.response?.data?.message || "Ocurrió un error";
            launchAlert("Error", MessageErrorBackend)
        }
        
    }
    return(
        <>
        <div className="w-full flex flex-col gap-6">
            <div className="flex inline-flex bg-gray-50 p-2 items-center rounded-2xl shadow-xl flex flex-row gap-1 text-lg gap-3 align-items-center">
                <Rocket/><h1 className="text-2xl font-semibold">Naves de Star Wars</h1>
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
                <Searchbar searchQuery={searchQuery} onSearchChange={setSearchQuery}/>
                <div className="flex w-full justify-between">
                    <button onClick={handleCreating} 
                    className={"hover: cursor-pointer flex flex-row gap-1 rounded-full hover:bg-blue-800/20 bg-blue-200/50 p-3 text-blue-800"}> 
                    <Plus/>Agregar Nave
                    </button>
                </div>
            </div>
            <TableData columns={columns} data={filteredData} onView={handleViewing} onEdit={handleEditing} onDelete={handleDeleteOpen}/>
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
            <StarshipsModal isOpen={isModalOpen} mode={modalMode} onClose={()=>{setIsModalOpen(false); setSelectedStarship(null)}} data={selectedStarship} onSave={handleSaving}></StarshipsModal>
            <ConfirmModal isOpen={isConfirmOpen} onClose={()=>{setIsConfirmOpen(false); setToDeleteItem("");}} title={`¿Desea eliminar la nave ${toDeleteItem.name}?`} onDelete={handleDeleting}></ConfirmModal>
            <AlertPopUp isOpen={isNotificationOpen} type={notificationType} message={notificationMessage} onClose={()=>setIsNotificationOpen(false)}></AlertPopUp>
        </div>           
        </>
    )
}