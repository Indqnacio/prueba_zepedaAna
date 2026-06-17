import axios from 'axios'
import { useEffect, useState } from "react";
import TablaPersonajes from './tablaPersonajes';
import TableData from './tableData';
import SpeciesModal from './modals/species';
export default function SpeciesPage(){
    const [species, setSpecies] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [index, setIndex]=useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('creating')
    const [selectedSpecie, setSelectedSpecie] = useState(null); 

     async function getSpecies(){
        const aux = await axios.get(`http://localhost:3000/getEspecies?page=${index}&limit=10`)
        setSpecies(aux.data.docs)
        setTotalPages(aux.data.totalPages)
    }
    useEffect(() => {
        getSpecies();
    }, [index]);
    useEffect(() => {
        console.log("especies ",species);
    }, [species]);

    async function nextPage() {
         setIndex(index+1)
    }
    async function prevPage() {
         setIndex(index-1)
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
        console.log("se disparo handle editing")
    }
    const handleViewing = (specie)=>{
        setModalMode("viewing")
        setSelectedSpecie(specie)
        setIsModalOpen(true)
    }
    const handleDeleting = ()=>{
        
    }
    const handleSaving = async (datos)=>{
        console.log("MOdal mode ", modalMode)
        if(modalMode === "editing"){
            console.log("datos a actualizar ", datos)
            const res= await axios.put("http://localhost:3000/putEspecie", datos)
            console.log(res)
        };
        alert("Pelicula actualizada con éxito")
        if(modalMode === "creating"){
            console.log("datos a postear ", datos)
           const res= await axios.post("http://localhost:3000/postEspecie", datos)
           console.log(res)
        };
        getSpecies();
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
        <h1>Página principal de Especies</h1>
        <button onClick={handleCreating}>Agregar Vehículo</button>
        <TableData columns={columns} data={species} onView={handleViewing} onEdit={handleEditing}/>
          <div className="flex">
                
                <button disabled={index===1} className={"hover: cursor-pointer border "} onClick={prevPage}>Página Anterior</button>
                <button disabled={index===totalPages} className={"hover: cursor-pointer border"} onClick={nextPage}>Página Siguiente</button>
                <p>Página: {index}/{totalPages}</p>
            </div>
        <SpeciesModal isOpen={isModalOpen} mode={modalMode} onClose={()=>{setIsModalOpen(false); setSelectedSpecie(null)}} data={selectedSpecie} onSave={handleSaving} ></SpeciesModal>
        </>
        
    )
}