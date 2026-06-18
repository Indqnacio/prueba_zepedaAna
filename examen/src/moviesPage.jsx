import react from "react"
import { useEffect, useState } from "react"
import axios from "axios";
import TableData from "./tableData";
import MoviesModal from "./modals/movies";
import ConfirmModal from "./confirmModal";
import Searchbar from "./searchbar";
import { Clapperboard, Plus, CircleChevronLeft, CircleChevronRight} from "lucide-react";
export default function MoviesPage(){
    const [movies, setMovies] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [index, setIndex]=useState(1);
    const [modalMode, setModalMode] = useState('creating')
    const [toDeleteItem, setToDeleteItem] = useState('');
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const columns = [
    {id: 'title', label: 'Personaje', minWidth:"10%" },
    {id: 'director', label: 'Director', minWidth:"10%"},
    {id: 'producer', label: 'Productor', minWidth:"10%"},
    {id:'actions',label:'Acciones',minWidth:"10%"}
]
    async function getMovies(){
        const aux = await axios.get(`http://localhost:3000/getPelis?page=${index}&limit=10`)
        setMovies(aux.data.docs)
        setTotalPages(aux.data.totalPages)
    }
      useEffect(() => {
        getMovies();
    }, [index]);
    async function nextPage() {
         setIndex(index+1)
    }
    async function prevPage() {
         setIndex(index-1)
    }

    const filteredData=movies.filter((item)=>{
        const query = searchQuery.toLocaleLowerCase();
        return(
            item.title.toLocaleLowerCase().includes(query)
        );
    });
    const handleCreating = ()=>{
        setModalMode("creating")
        setSelectedMovie(null)
        setIsModalOpen(true)
    }

    const handleEditing = (movie)=>{
        setModalMode("editing")
        setSelectedMovie(movie)
        setIsModalOpen(true)
        console.log("se disparo handle editing")
    }
    const handleViewing = (movie)=>{
        setModalMode("viewing")
        setSelectedMovie(movie)
        setIsModalOpen(true)
    }
    const handleDeleteOpen = (movie)=>{
        setIsConfirmOpen(true)
        setToDeleteItem(movie)

    }
    const handleDeleting = async()=>{
        try{
            const payload={
            id: `${toDeleteItem._id}`
            }
            console.log("data a enviar ", payload);
            const res = await axios.delete("http://localhost:3000/delePeli",{data:payload})
            console.log(res)
            setIsConfirmOpen(false);
            getMovies();
        }catch(error){
            alert("Error al borrar elemento ", error)
            console.log("Error ", error);
        }
    }
    const handleSaving = async (datos)=>{
        console.log("MOdal mode ", modalMode)
        if(modalMode === "editing"){
            console.log("datos a actualizar ", datos)
            const res= await axios.put("http://localhost:3000/putPeli", datos)
            console.log(res)
        };
        alert("Pelicula actualizada con éxito")
        if(modalMode === "creating"){
            console.log("datos a postear ", datos)
           const res= await axios.post("http://localhost:3000/postPeli", datos)
           console.log(res)
        };
        getMovies();
    }
    return(
        <>
        <div className="w-full flex flex-col gap-6">
            <div className="flex inline-flex bg-gray-50 p-2 items-center rounded-2xl shadow-xl flex flex-row gap-1 text-lg gap-3 align-items-center">
                <Clapperboard/><h1 className="text-2xl font-semibold">Películas de Starwars</h1>
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full mt-7">
                <Searchbar searchQuery={searchQuery} onSearchChange={setSearchQuery}/>
                <div className="flex w-full justify-between">
                    <button onClick={handleCreating} 
                    className={"hover: cursor-pointer flex flex-row gap-1 rounded-full hover:bg-blue-800/20 bg-blue-200/50 p-3 text-blue-800"}> <Plus/>Agregar Película</button>
                </div>
            </div>
            <TableData columns={columns} data={filteredData} onView={handleViewing} onEdit={handleEditing} onDelete={handleDeleteOpen}></TableData>
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
            <MoviesModal isOpen={isModalOpen} mode={modalMode} onClose={()=>{setIsModalOpen(false); setSelectedMovie(null)}} data={selectedMovie} onSave={handleSaving}></MoviesModal>
            <ConfirmModal isOpen={isConfirmOpen} onClose={()=>{setIsConfirmOpen(false); setToDeleteItem("");}} message={`¿Desea eliminar la película ${toDeleteItem.title}?`} onDelete={handleDeleting}></ConfirmModal>
        </div>
        

        
        </>
    ) 
}