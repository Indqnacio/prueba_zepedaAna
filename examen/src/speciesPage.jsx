import axios from 'axios'
import { useEffect, useState } from "react";
import TablaPersonajes from './tablaPersonajes';
import TableData from './tableData';
import SpeciesModal from './modals/species';
import ConfirmModal from './confirmModal';
import Searchbar from "./searchbar";
import AlertPopUp from "./alertPopUp";
import { PersonStanding,Plus, CircleChevronLeft, CircleChevronRight } from 'lucide-react';
export default function SpeciesPage(){
    const [species, setSpecies] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [index, setIndex]=useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('creating')
    const [selectedSpecie, setSelectedSpecie] = useState(null); 
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [toDeleteItem, setToDeleteItem] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notificationType, setNotificationType] = useState("");
    const [notificationMessage, setNotificationMessage] = useState("");
    
    async function getSpecies(){
        const aux = await axios.get(`http://localhost:3000/getEspecies?page=${index}&limit=10`)
        setSpecies(aux.data.docs)
        setTotalPages(aux.data.totalPages)
    }
    useEffect(() => {
        getSpecies();
    }, [index]);


    async function nextPage() {
        setIndex(index+1)
    }
    async function prevPage() {
        setIndex(index-1)
    }
    const filteredData=species.filter((item)=>{
        const query = searchQuery.toLocaleLowerCase();
        return(
            item.name.toLocaleLowerCase().includes(query)
        );
    });
    const launchAlert = (type, message)=>{
        setIsNotificationOpen(true);
        setNotificationMessage(message);
        setNotificationType(type)
    }
    const handleCreating = ()=>{
        setModalMode("creating")
        setSelectedSpecie(null)
        setIsModalOpen(true)
    }

    const handleEditing = (specie)=>{
        setModalMode("editing")
        setSelectedSpecie(specie)
        setIsModalOpen(true)
    }
    const handleViewing = (specie)=>{
        setModalMode("viewing")
        setSelectedSpecie(specie)
        setIsModalOpen(true)
    }
    const handleDeleteOpen = (movie)=>{
        setIsConfirmOpen(true)
        setToDeleteItem(movie)

    }
    const handleDeleting =async ()=>{
        try{
            const payload={
            id: `${toDeleteItem._id}`
            }
            const res = await axios.delete("http://localhost:3000/deleEspecie",{data:payload})
            setIsConfirmOpen(false);
            getSpecies();
        }catch(error){
            alert("Error al borrar elemento ", error)
        }
    }
    const handleSaving = async (datos)=>{
        try{
            if(modalMode === "editing"){
                const res= await axios.put("http://localhost:3000/putEspecie", datos);
            };
            if(modalMode === "creating"){
                const res= await axios.post("http://localhost:3000/postEspecie", datos);
            };
            launchAlert("isSuccess","Cambios realizados con éxito.")
            setIsModalOpen(false);
            getSpecies();
        }catch(error){
            const MessageErrorBackend = error.response?.data?.message || "Ocurrió un error";
            launchAlert("Error", MessageErrorBackend)
        }
    }
    const columns = [
    {id: 'name', label: 'Nombre', minWidth:"10%" },
    {id: 'classification', label: 'Clasificación', minWidth:"10%"},
    {id: 'designation', label: 'Designación', minWidth:"10%"},
    {id: 'average_height', label: 'Altura', minWidth:"10%"},
    {id: 'average_lifespan', label: 'Esperanza de Vida', minWidth:"10%"},
    {id: 'eye_colors', label: 'Color de Ojos', minWidth:"10%"},
    {id: 'hair_colors', label: 'Color de Cabello', minWidth:"10%"},
    {id: 'skin_colors', label: 'Color de Piel', minWidth:"10%"},
    {id: 'language', label: 'Lenguaje', minWidth:"10%"},
    //{id: 'homeworld', label: 'Planeta', minWidth:"10%"},
    {id:'actions',label:'Acciones',minWidth:"10%"}
]
    return(
        <>
          <div className="w-full flex flex-col gap-6">
             <div className="flex inline-flex bg-gray-50 p-2 items-center rounded-2xl shadow-xl flex flex-row gap-1 text-lg gap-3 align-items-center">
                <PersonStanding/><h1 className="text-2xl font-semibold">Especies de Star Wars</h1>
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
                <Searchbar searchQuery={searchQuery} onSearchChange={setSearchQuery}/>
                <div className="flex w-full justify-between">
                    <button onClick={handleCreating} 
                    className={"hover: cursor-pointer flex flex-row gap-1 rounded-full hover:bg-blue-950 bg-blue-800 text-white p-3 text-blue-800"}> <Plus/>Agregar Especie</button>
                </div>
            </div>
            <TableData columns={columns} onView={handleViewing} onEdit={handleEditing} data={filteredData} onDelete={handleDeleteOpen}/>
            <div className="flex items-center justify-end p-4 gap-3">
                 <p className="font-medium">
                    Página <span className="text-slate-600">{index}</span>
                    de {" "} <span className="text-slate-600">{totalPages}</span>
                </p>
                <div className="flex gaphandleDeleting-2">
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
            <SpeciesModal isOpen={isModalOpen} mode={modalMode} onClose={()=>{setIsModalOpen(false); setSelectedSpecie(null)}} data={selectedSpecie} onSave={handleSaving} ></SpeciesModal>
            <ConfirmModal isOpen={isConfirmOpen} onClose={()=>{setIsConfirmOpen(false); setToDeleteItem("");}} title={`¿Desea eliminar la especie ${toDeleteItem.name}?`} onDelete={handleDeleting}></ConfirmModal>
            <AlertPopUp isOpen={isNotificationOpen} type={notificationType} message={notificationMessage} onClose={()=>setIsNotificationOpen(false)}></AlertPopUp>
        </div>
        </>
        
    )
}