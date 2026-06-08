import { useState, useEffect } from "react";

export default function PaginaPrincipal(){
const [personajes, setPersonajes] = useState([]);
const [vehiculos, setVehiculos] = useState([]);
const [planetas, setPlanetas] = useState([]);
const [cargando, setCargando] = useState(false);

useEffect(()=>{
    const consumirAPI= async() =>{
        try{
            setCargando(true);
            const res = await fetch('https://swapi.info/api/people');
            const datos = res.json();
            setPersonajes(datos);
            console.log(datos);
            console.log("personajes");
            setCargando(false);
        } catch(error){
            console.log(error);
            console.log('Error al traer personajes');
        }
    };
    consumirAPI();
},[]);
return(
    <>
        {personajes?
            <p>SI llegan los personajes</p>
        : <p>NO llegan los personajes</p>   
    }
        
    </>
)

}