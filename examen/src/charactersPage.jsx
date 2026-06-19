import { useState, useEffect } from "react";
import axios from "axios";
import TableData from "./tableData";
import CharactersModal from "./modals/characters";
import ConfirmModal from "./confirmModal";
import Searchbar from "./searchbar";
import AlertPopUp from "./alertPopUp";
import { UsersRound, Plus, CircleChevronLeft, CircleChevronRight } from 'lucide-react';

export default function CharactersPage(){
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [characters, setCharacters] = useState([])
    const [filteredCharacters, setFilteredCharacters] = useState([])
    const [totalPages, setTotalPages] = useState(0);
    const [films, setFilms] = useState([])
    const [index, setIndex]=useState(1);
    const [toDeleteItem, setToDeleteItem] = useState('');
    const [modalMode, setModalMode] = useState('creating')
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notificationType, setNotificationType] = useState("");
    const [notificationMessage, setNotificationMessage] = useState("");

    const columns = [
    {id: 'name', label: 'Nombre', minWidth:60 },
    {id: 'height', label: 'Altura', format: (value) => value.toFixed(2)},
    {id: 'mass', label: 'Peso', format: (value) => value.toFixed(2)},
    {id: 'skin_color', label: 'Color de Piel'},
    {id: 'hair_color', label: 'Color de Cabello'},
    {id: 'eye_color', label: 'Color de Ojos'},
    {id: 'birth_year', label: 'Fecha de Nacimiento'},
    {id: 'gender', label: 'Género'},
    {id: 'actions',label:'Acciones'}
]

    async function fetchMovies(){
        const res = await axios.get('http://localhost:3000/getPeliPerso')
        const data = res.data.docs
        setFilms(data)
    }
    const fetchCharacters = async() => {
        const res = await axios.get(`http://localhost:3000/getPersonajes?page=${index}&limit=10`);
        const datos = res.data.docs;
        setCharacters(datos)
        setFilteredCharacters(datos);
        setTotalPages(res.data.totalPages)
    }
    useEffect(()=>{
        fetchCharacters();
        fetchMovies();
    },[index])
    const filteredData=characters.filter((item)=>{
        const query = searchQuery.toLocaleLowerCase();
        return(
            item.name.toLocaleLowerCase().includes(query)
        );
    });
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
        setSelectedCharacter(null)
        setIsModalOpen(true)
    }

    const handleEditing = (character)=>{
        setModalMode("editing")
        setSelectedCharacter(character)
        setIsModalOpen(true)
        console.log("se disparo handle editing")
    }
    const handleViewing = (character)=>{
        setModalMode("viewing")
        setSelectedCharacter(character)
        setIsModalOpen(true)
    }
    const handleDeleteOpen = (character)=>{
        setIsConfirmOpen(true)
        setToDeleteItem(character)

    }
    const handleDeleting = async()=>{
        try{
            const payload={
            id: `${toDeleteItem._id}`
            }
            console.log("data a enviar ", payload);
            const res = await axios.delete("http://localhost:3000/deletePersonaje",{data:payload})
            console.log(res)
            setIsConfirmOpen(false);
            fetchCharacters();
        }catch(error){
            alert("Error al borrar elemento ", error)
            console.log("Error ", error);
        }
    }
    const handleSaving = async (datos)=>{
        try{
            if(modalMode === "editing"){
                console.log("datos a actualizar ", datos)
                const res= await axios.put("http://localhost:3000/putPersonaje", datos)
                console.log(res)
            };
            if(modalMode === "creating"){
                console.log("datos a postear ", datos)
                const res= await axios.post("http://localhost:3000/postPersonaje", datos)
                console.log(res)
            };
            launchAlert("isSuccess","Cambios realizados con éxito.")
            setIsModalOpen(false);
            fetchCharacters();
        }catch(error){
            const MessageErrorBackend = error.response?.data?.message || "Ocurrió un error";
            launchAlert("Error", MessageErrorBackend)
        }
    }
    return(
        <>
        <div className="w-full flex flex-col gap-6">
            <div className="flex inline-flex bg-gray-50 p-2 items-center rounded-2xl shadow-xl flex flex-row gap-1 text-lg gap-3 align-items-center">
                <UsersRound/><h1 className="text-2xl font-semibold">Personajes de Star Wars</h1>
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
                <Searchbar searchQuery={searchQuery} onSearchChange={setSearchQuery}/>
                <div className="flex w-full justify-between">
                    <button onClick={handleCreating} 
                    className={"hover: cursor-pointer flex flex-row gap-1 rounded-full hover:bg-blue-800/20 bg-blue-200/50 p-3 text-blue-800"}> <Plus/>Agregar Personaje</button>
                </div>
            </div>
            <TableData columns={columns} onView={handleViewing} onEdit={handleEditing} data={filteredData} onDelete={handleDeleteOpen}/>
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
            <CharactersModal mode={modalMode} isOpen={isModalOpen} modal={modalMode} onClose={()=>{setIsModalOpen(false); setSelectedCharacter(null)}} data={selectedCharacter} onSave={handleSaving}></CharactersModal>
            <ConfirmModal isOpen={isConfirmOpen} onClose={()=>{setIsConfirmOpen(false); setToDeleteItem("");}} title={`¿Desea eliminar el personaje ${toDeleteItem.name}?`} onDelete={handleDeleting}></ConfirmModal>
            <AlertPopUp isOpen={isNotificationOpen} type={notificationType} message={notificationMessage} onClose={()=>setIsNotificationOpen(false)}></AlertPopUp>
        </div>

        </>
        
    )
}