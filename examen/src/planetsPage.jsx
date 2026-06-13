import react from "react"
import axios from "axios"
import { useEffect, useState } from "react"
import TableData from "./tableData"

export default function PlanetsPage(){

    const [planets,setPlanets] = useState([])

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
        const aux = await axios.get('http://localhost:3000/getPlanetas')
        setPlanets(aux.data.docs)
    }
    useEffect(()=>{
        fetchPlanets();
    },[])
    useEffect(()=>{
        console.log("planetas", planets)
    },[planets])

    return(
        <>
        <h1>Página principal de Planetas</h1>
        <TableData columns={columns} data={planets}/>
        </>
        

    )
}