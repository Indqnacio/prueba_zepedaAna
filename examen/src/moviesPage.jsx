import react from "react"
import { useEffect, useState } from "react"
import axios from "axios";
import TableData from "./tableData";
import MoviesModal from "./modals/movies";
import ConfirmModal from "./confirmModal";
export default function MoviesPage(){
    const [movies, setMovies] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [index, setIndex]=useState(1);
    const [modalMode, setModalMode] = useState('creating')
    const [toDeleteItem, setToDeleteItem] = useState('');
    const [selectedMovie, setSelectedMovie] = useState(null);
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
        console.log(modalMode)
    }, [index]);
    async function nextPage() {
         setIndex(index+1)
    }
    async function prevPage() {
         setIndex(index-1)
    }

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
            <h1>Página principal de Películas</h1>
            <button onClick={handleCreating}>Agregar Película</button>
            <TableData columns={columns} data={movies} onView={handleViewing} onEdit={handleEditing} onDelete={handleDeleteOpen}></TableData>
            <div className="flex">
                <button disabled={index==1} className={"hover: cursor-pointer border "} onClick={prevPage}>Página Anterior</button>
                <button disabled={index==totalPages} className={"hover: cursor-pointer border"} onClick={nextPage}>Página Siguiente</button>
                <p>Página: {index}/{totalPages}</p>
            </div>
            <MoviesModal isOpen={isModalOpen} mode={modalMode} onClose={()=>{setIsModalOpen(false); setSelectedMovie(null)}} data={selectedMovie} onSave={handleSaving}></MoviesModal>
            <ConfirmModal isOpen={isConfirmOpen} onClose={()=>{setIsConfirmOpen(false); setToDeleteItem(null);}} message={"Desea eliminar la película"} onDelete={handleDeleting}></ConfirmModal>
        </>
    ) 
}