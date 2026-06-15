import react from "react"
import axios from "axios"
import { useEffect, useState } from "react"
import TableData from "./tableData"
import PlanetsModal from "./modals/planets"

export default function PlanetsPage(){

    const [planets,setPlanets] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [index, setIndex]=useState(1);
    const columns = [
    {id: 'name', label: 'Nombre', minWidth:"10%" },
    {id: 'diameter', label: 'Diametro', minWidth:"10%"},
    {id: 'rotation_period', label: 'Periodo de Rotación', minWidth:"10%"},
    {id: 'orbital_period', label: 'Periodo de Órbita', minWidth:"10%"},
    {id: 'gravity', label: 'Gravedad', minWidth:"10%"},
    {id: 'population', label: 'Población', minWidth:"10%"},
    {id: 'climate', label: 'Clima', minWidth:"10%"},
    {id: 'terrain', label: 'Terreno', minWidth:"10%"},
    {id: 'surface_water', label: 'Superficie de Agua', minWidth:"10%"},
    {id:'actions',label:'Acciones',minWidth:"10%"}
]
    async function fetchPlanets(){
        const aux = await axios.get(`http://localhost:3000/getPlanetas?page=${index}&limit=10`)
        setPlanets(aux.data.docs)
        setTotalPages(aux.data.totalPages)
    }
    useEffect(()=>{
        fetchPlanets();
    },[index])
     async function nextPage() {
         setIndex(index+1)
    }
    async function prevPage() {
         setIndex(index-1)
    }

    return(
        <>
        <h1>Página principal de Planetas</h1>
         <button onClick={()=>setIsModalOpen(true)}>Agregar Planeta</button>
        <TableData columns={columns} data={planets}/>
        <div className="flex">
                
                <button disabled={index===1} className={"hover: cursor-pointer border "} onClick={prevPage}>Página Anterior</button>
                <button disabled={index===totalPages} className={"hover: cursor-pointer border"} onClick={nextPage}>Página Siguiente</button>
                <p>Página: {index}/{totalPages}</p>
            </div>
        <PlanetsModal isOpen={isModalOpen} onClose={()=>{setIsModalOpen(false); fetchPlanets()}}/>
        </>
    )
}