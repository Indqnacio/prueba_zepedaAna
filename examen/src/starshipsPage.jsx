import react from "react"
import axios from "axios"
import { useState, useEffect } from "react"
import TableData from "./tableData"
import StarshipsModal from "./modals/starships"
export default function StarshipsPage(){
    const [starships, setStarships] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [index, setIndex]=useState(1);
    const [modalMode, setModalMode] = useState('creating')
    const [selectedStarship, setSelectedStarship] = useState(null);

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
    const handleDeleting = ()=>{
        
    }
    const handleSaving = async (datos)=>{
        console.log("MOdal mode ", modalMode)
        if(modalMode === "editing"){
            console.log("datos a actualizar ", datos)
            const res= await axios.put("http://localhost:3000/putNave", datos)
            console.log(res)
        };
        alert("Pelicula actualizada con éxito")
        if(modalMode === "creating"){
            console.log("datos a postear ", datos)
           const res= await axios.post("http://localhost:3000/postNave", datos)
           console.log(res)
        };
        fetchStarships();
    }
    return(
        <>
        <h1>Página principal de Naves</h1>
         <button onClick={handleCreating}>Agregar Nave</button>
        <TableData columns={columns} data={starships} onView={handleViewing} onEdit={handleEditing} />
          <div className="flex">
                
                <button disabled={index===1} className={"hover: cursor-pointer border "} onClick={prevPage}>Página Anterior</button>
                <button disabled={index===totalPages} className={"hover: cursor-pointer border"} onClick={nextPage}>Página Siguiente</button>
                <p>Página: {index}/{totalPages}</p>
            </div>
            <StarshipsModal isOpen={isModalOpen} mode={modalMode} onClose={()=>{setIsModalOpen(false); setSelectedStarship(null)}} data={selectedStarship} onSave={handleSaving}></StarshipsModal>
        </>
    )
}