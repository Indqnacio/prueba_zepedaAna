import react from "react"
import axios from "axios"
import { useEffect, useState } from "react"
import TableData from "./tableData"
import PlanetsModal from "./modals/planets"
import ConfirmModal from "./confirmModal"
export default function PlanetsPage(){

    const [planets,setPlanets] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [modalMode, setModalMode] = useState('creating')
    const [selectedPlanet, setSelectedPlanet] = useState(null);
    const [index, setIndex]=useState(1);
    const [toDeleteItem, setToDeleteItem] = useState('');
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

    const handleCreating = ()=>{
        setModalMode("creating")
        setSelectedPlanet(null)
        setIsModalOpen(true)
    }

    const handleEditing = (planet)=>{
        setModalMode("editing")
        setSelectedPlanet(planet)
        setIsModalOpen(true)
        console.log("se disparo handle editing")
    }
    const handleViewing = (planet)=>{
        setModalMode("viewing")
        setSelectedPlanet(planet)
        setIsModalOpen(true)
    }

    const handleDeleteOpen = (movie)=>{
        setIsConfirmOpen(true)
        setToDeleteItem(movie)
    }
    const handleSaving = async (datos)=>{
        console.log("MOdal mode ", modalMode)
        if(modalMode === "editing"){
            console.log("datos a actualizar ", datos)
            const res= await axios.put("http://localhost:3000/putPlaneta", datos)
            console.log(res)
        };
        alert("Planeta actualizada con éxito")
        if(modalMode === "creating"){
            console.log("datos a postear ", datos)
           const res= await axios.post("http://localhost:3000/postPlaneta", datos)
           console.log(res)
        };
        fetchPlanets();
    }

    const handleDeleting = async()=>{
        try{
            const payload={
            id: `${toDeleteItem._id}`
            }
            console.log("data a enviar ", payload);
            const res = await axios.delete("http://localhost:3000/delePlaneta",{data:payload})
            console.log(res)
            setIsConfirmOpen(false);
            fetchPlanets();
        }catch(error){
            alert("Error al borrar elemento ", error)
            console.log("Error ", error);
        }
    }

    return(
        <>
        <h1>Página principal de Planetas</h1>
         <button onClick={handleCreating}>Agregar Planeta</button>
        <TableData columns={columns} data={planets} onView={handleViewing} onDelete={handleDeleteOpen} onEdit={handleEditing} />
        <div className="flex">
                
                <button disabled={index===1} className={"hover: cursor-pointer border "} onClick={prevPage}>Página Anterior</button>
                <button disabled={index===totalPages} className={"hover: cursor-pointer border"} onClick={nextPage}>Página Siguiente</button>
                <p>Página: {index}/{totalPages}</p>
            </div>
        <PlanetsModal 
        isOpen={isModalOpen} 
        mode={modalMode} 
        onClose={()=>{setIsModalOpen(false); 
        setSelectedPlanet(null); setIsModalOpen(null)}} data={selectedPlanet} onSave={handleSaving}/>
        <ConfirmModal isOpen={isConfirmOpen} onClose={()=>{setIsConfirmOpen(false); setToDeleteItem(null);}} message={"Desea eliminar el planeta"} onDelete={handleDeleting}></ConfirmModal>
        </>
    )
}