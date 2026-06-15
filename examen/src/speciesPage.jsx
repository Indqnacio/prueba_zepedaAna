import axios from 'axios'
import { useEffect, useState } from "react";
import TablaPersonajes from './tablaPersonajes';
import TableData from './tableData';
export default function SpeciesPage(){
    const [species, setSpecies] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [index, setIndex]=useState(1);

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
    {id: 'homeworld', label: 'Planeta', minWidth:"10%"},
    {id:'actions',label:'Acciones',minWidth:"10%"}
]
    return(
        <>
        <h1>Página principal de Especies</h1>
        <TableData columns={columns} data={species}/>
          <div className="flex">
                
                <button disabled={index===1} className={"hover: cursor-pointer border "} onClick={prevPage}>Página Anterior</button>
                <button disabled={index===totalPages} className={"hover: cursor-pointer border"} onClick={nextPage}>Página Siguiente</button>
                <p>Página: {index}/{totalPages}</p>
            </div>
        </>
        
    )
}