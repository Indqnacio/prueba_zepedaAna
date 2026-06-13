import axios from 'axios'
import { useEffect, useState } from "react";
import TablaPersonajes from './tablaPersonajes';
import TableData from './tableData';
export default function SpeciesPage(){
    const [species, setSpecies] = useState([]);
    
     async function getSpecies(){
        const aux = await axios.get('http://localhost:3000/getEspecies')
        setSpecies(aux.data.docs)
    }
    useEffect(() => {
        getSpecies();
    }, []);
    useEffect(() => {
        console.log("especies ",species);
    }, [species]);

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
        </>
        
    )
}