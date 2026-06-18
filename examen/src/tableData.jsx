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
import { Eye, Pencil, Trash2 } from "lucide-react";

export default function TableData({columns, data, onView, onEdit, onDelete}){
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
      <div className="w-full  mx-auto my-4 ">
        <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-xl max-w-[1400px] max-h-[550px] overflow-y-auto overflow-x-auto">
            <table className="w-full border-collapse">
            <thead className="bg-blue-800 text-md text-lg tracking-wider sticky top-0 z-10">
              <tr>
                {columns.map((column) =>(
                    (<th className="px-6 py-4 font-semibold text-center text-gray-50" key={column.id}>{column.label}</th>)
                ))}
              </tr>
            </thead>
            <tbody className="divide-y- divide-slate-800/60 bg-gray-50">
              {data.length===0 &&(
                <tr>
                  <td colSpan={columns.length} className="px-6 py-12 text-center text-slate-500 roboto font-medium">
                    No hay registros disponibles para esta entidad
                  </td>
                </tr>
              )}
                {data.map((item)=>{
                  return(
                    <tr className="hover:bg-slate-100 transition-colors text-center" key={item.name}>
                      {columns.map((column)=>{
                        const value = item[column.id];

                        if(column.id==='actions'){
                          return(
                            
                            <td  className="px-6 py-2 text-center" key={column.id}>
                              <div className="flex justify-center items-center gap-1">
                                <button className="hover:cursor-pointer p-1 rounded-xl 
                                bg-blue-800/10 text-blue-400 hover:bg-blue-800/20" 
                                onClick={()=>onView(item)}><Eye size={16}/></button>

                              <button className="hover:cursor-pointer p-1 rounded-xl 
                                bg-orange-500/10 text-orange-400 hover:bg-orange-800/20" 
                                onClick={()=>onEdit(item)}><Pencil size={16}/></button>

                              <button className="hover:cursor-pointer p-1 rounded-xl 
                                bg-red-500/10 text-red-400 hover:bg-red-800/20"  
                                onClick={()=>onDelete(item)}>
                                  <Trash2 size={16}
                                  className="transition-transform group-hover:scale-110"/>
                              </button>
                              </div>
                              
                            </td>
                          )
                        }
                        return(
                          <td className="p-1.5" key={column.id}>{value}</td>
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