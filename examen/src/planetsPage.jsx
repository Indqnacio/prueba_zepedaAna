import react from "react"
import axios from "axios"
import { useEffect, useState } from "react"
import TableData from "./tableData"
import PlanetsModal from "./modals/planets"
import ConfirmModal from "./confirmModal"
import Searchbar from "./searchbar";
import { Orbit,CircleChevronRight,CircleChevronLeft, Plus } from 'lucide-react';
export default function PlanetsPage(){

    const [planets,setPlanets] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [modalMode, setModalMode] = useState('creating')
    const [selectedPlanet, setSelectedPlanet] = useState(null);
    const [index, setIndex]=useState(1);
    const [toDeleteItem, setToDeleteItem] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
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

    const filteredData=planets.filter((item)=>{
        const query = searchQuery.toLocaleLowerCase();
        return(
            item.name.toLocaleLowerCase().includes(query)
        );
    });
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
        <div className="w-full flex flex-col gap-6">
            <div className="flex inline-flex bg-gray-50 p-2 items-center rounded-2xl shadow-xl flex flex-row gap-1 text-lg gap-3 align-items-center">
                <Orbit/><h1 className="text-2xl font-semibold">Planetas de Starwars</h1>
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
                <Searchbar searchQuery={searchQuery} onSearchChange={setSearchQuery}/>
                <div className="flex w-full justify-between">
                    <button onClick={handleCreating} 
                    className={"hover: cursor-pointer flex flex-row gap-1 rounded-full hover:bg-blue-800/20 bg-blue-200/50 p-3 text-blue-800"}> <Plus/>Agregar Planeta</button>
                </div>
            </div>
            <TableData columns={columns} data={filteredData} onView={handleViewing} onDelete={handleDeleteOpen} onEdit={handleEditing} />
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
        </div>
        <PlanetsModal 
        isOpen={isModalOpen} 
        mode={modalMode} 
        onClose={()=>{setIsModalOpen(false); 
        setSelectedPlanet(null); setIsModalOpen(null)}} data={selectedPlanet} onSave={handleSaving}/>
        <ConfirmModal isOpen={isConfirmOpen} onClose={()=>{setIsConfirmOpen(false); setToDeleteItem("");}} title={`¿Desea eliminar el planeta ${toDeleteItem.name}?`} onDelete={handleDeleting}></ConfirmModal>
        </>
    )
}