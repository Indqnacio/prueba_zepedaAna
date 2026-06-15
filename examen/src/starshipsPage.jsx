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
    return(
        <>
        <h1>Página principal de Naves</h1>
         <button onClick={()=>setIsModalOpen(true)}>Agregar Nave</button>
        <TableData columns={columns} data={starships}/>
          <div className="flex">
                
                <button disabled={index===1} className={"hover: cursor-pointer border "} onClick={prevPage}>Página Anterior</button>
                <button disabled={index===totalPages} className={"hover: cursor-pointer border"} onClick={nextPage}>Página Siguiente</button>
                <p>Página: {index}/{totalPages}</p>
            </div>
            <StarshipsModal isOpen={isModalOpen} onClose={()=>{setIsModalOpen(false); fetchStarships()}}></StarshipsModal>
        </>
    )
}