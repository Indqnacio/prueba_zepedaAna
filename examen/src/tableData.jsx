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

export default function TableData({columns, data}){
  const [pagina, setPagina] = useState(0);
  const [filasPPag, setFilasPPag] = useState(10);
  const [item, setItem] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);
  const handleChangePage = (event, newPage) => {
    setPagina(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setFilasPPag(+event.target.value);
    setPagina(0);
  };
  const handleOpen = (e, personaje) => {
    setItem(personaje); 
    console.log(item); 
    setIsModalOpen(true)
  }
    return(
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <>
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
                
                </>
                
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(pagina * filasPPag, pagina * filasPPag + filasPPag)
              .map((personaje) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={personaje.name} onClick={() => {setItem(personaje); setIsModalOpen(true)}}>
                    {columns.map((column) => {
                      let value = personaje[column.id];
                      {if (column.id === 'actions') value=(<><Button>Ver</Button>
                                <Button>Actualizar</Button>
                                <Button>Eliminar</Button></>)}
                      
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                            
                        </TableCell>
                        
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={filasPPag}
        page={pagina}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      
    </Paper>
    )
}