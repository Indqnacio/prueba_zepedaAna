import axios from 'axios'
import { useEffect, useState } from "react";
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

    return(
        <>
        <h1>Página principal de Especies</h1>
        
        </>
        
    )
}