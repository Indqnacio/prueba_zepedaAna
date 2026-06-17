import { useState, useEffect } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import axios from "axios";
import ExtraInfoModal from "./extraInfoModal";

export default function TableData({columns, data, onView, onEdit}){
  const [pagina, setPagina] = useState(0);
  const [filasPPag, setFilasPPag] = useState(10);
  const [item, setItem] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);
  const handleChangePage = (event, newPage) => {
    setPagina(newPage);
  };

  const handleOpen = (e, personaje) => {
    setItem(personaje); 
   // console.log(item); 
    setIsModalOpen(true)
  }
    return(
      <div className="w-full  mx-auto my-8 p-4">
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
            <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column) =>(
                    (<th className="px-6 py-4 font-medium text-gray-900" key={column.id}>{column.label}</th>)
                ))}
              </tr>
            </thead>
            <tbody className="divide-y- divide-slate-800/60">
              {data.length===0 &&(
                <tr>
                  <td colSpan={columns.length+1} className="px-6 py-8 text-center text-slate-500 italic">
                    No hay registros disponibles para esta entidad
                  </td>
                </tr>
              )}
                {data.map((item)=>{
                  return(
                    <tr className="hover:cursor-pointer" key={item.name}>
                      {columns.map((column)=>{
                        const value = item[column.id];

                        if(column.id==='actions'){
                          return(
                            
                            <td key={column.id}>
                              <div className="flex">
                                <button className="hover:cursor-pointer border" onClick={()=>onView(item)}>Ver</button>
                              <button className="hover:cursor-pointer border" onClick={()=>onEdit(item)}>Editar</button>
                              <button className="hover:cursor-pointer border" onClick={()=>alert("eliminando")}>Eliminar</button>
                              </div>
                              
                            </td>
                          )
                        }
                        return(
                          <td key={column.id}>{value}</td>
                        )
                      })}
                   </tr>
                  )
                })}

            </tbody>
        </table>
        </div>
              
      </div>

    )
}