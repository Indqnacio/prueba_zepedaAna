import {useState, useEffect} from 'react'
import TablaPersonajes from './tablaPersonajes'
import ExtraInfoModal from './extraInfoModal'
import axios from "axios";

export default function MainPage() {

    const [personajes, setPersonajes] = useState([]);
    const [planetas, setPlanetas] = useState([]);
    const fetchPersonajes = async() => {
        const res = await axios.get('https://swapi.info/api/people');
        const datos = res.data;
        
        datos.forEach(async (personaje) => {
            const resPlaneta = await axios.get(personaje.homeworld);
            const planeta = resPlaneta.data.name;
            personaje.homeworld = planeta;
        });
        console.log("informacion ",datos[0].films);
        setPersonajes(datos)
    }
    const fetchPlanetas = async(aux) => {
        const res = await axios.get(`${aux}}`);
        const datos = await res.data;
        return(datos.name);
    }
    useEffect(() => {
    fetchPersonajes();
    fetchPlanetas();
},[]);
    return (
        <>
        <h1>Personajes de Star Wars</h1>
        <TablaPersonajes personajes={personajes}></TablaPersonajes>
        </>
        
    )
}