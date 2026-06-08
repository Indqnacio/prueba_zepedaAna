import { useState, useEffect } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
    {id: 'name', label: 'Nombre', minWidth:60 },
    {id: 'height', label: 'Altura', format: (value) => value.toFixed(2)},
    {id: 'mass', label: 'Peso', format: (value) => value.toFixed(2)},
    {id: 'hair_color', label: 'Color de Cabello'},
    {id: 'eye_color', label: 'Color de Ojos'},
    {id: 'birth_year', label: 'Fecha de Nacimiento'},
    {id: 'gender', label: 'Género'},
    {id: 'homeworld', label: 'Planeta de Nacimiento'},
]

export default function PaginaPrincipal(){
const [pagina, setPagina] = useState(0);
const [filasPPag, setFilasPPag] = useState(10);
const [personajes, setPersonajes] = useState([]);
const [vehiculos, setVehiculos] = useState([]);
const [planetas, setPlanetas] = useState([]);
const [cargando, setCargando] = useState(true);


useEffect(()=>{
    const consumirAPI= async() =>{
        try{
            const res = await fetch('https://swapi.info/api/people');
            const datos = await res.json();
            if(datos){
                console.log("Datos ", datos);
                setPersonajes([datos])
              //  console.log("Personajes ",personajes);
            } else {
                console.log("NO cumple con el formato requerido ", datos)
            }
            setCargando(false);
        } catch(error){
            console.log(error);
            console.log('Error al traer personajes');
        }
    };
    consumirAPI();
    //console.log(personajes);
},[setCargando[true]]);

useEffect(() => {
    if(personajes.length>0){
        console.log("Personajes ",personajes[0]);
        console.log()
        console.log("primer persoinaje ",personajes[0][1]);
        console.log("nombre de personaje ",personajes[0][2]?.height);
        console.log("nombre de personaje 2 ",personajes[0][23]?.name);
    } 
}, [personajes])
return(
    <>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight:440 }}>
                <TableHead>
                    {columns.map((column) => (
                        <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        >
                            {column.label}
                        </TableCell>
                    ))}
                </TableHead>
                 <TableBody>
            {personajes
              //.slice(pagina * filasPPag, pagina * filasPPag + filasPPag)
              .map((personaje, i) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                    {columns.map((column) => {
                      const value = personaje[i][column.id];
                      //const value = personaje[name];
                      return (
                        <>
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                        </>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
            </TableContainer>
        </Paper>
    </>
)}