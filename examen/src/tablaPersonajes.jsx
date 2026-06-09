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

function TablaPersonajes({ personajes }) {
const [pagina, setPagina] = useState(0);
const [filasPPag, setFilasPPag] = useState(10);
const [item, setItem] = useState();
const [isModalOpen, setIsModalOpen] = useState(false);

const columns = [
    {id: 'name', label: 'Nombre', minWidth:60 },
    {id: 'height', label: 'Altura', format: (value) => value.toFixed(2)},
    {id: 'mass', label: 'Peso', format: (value) => value.toFixed(2)},
    {id: 'skin_color', label: 'Color de Piel'},
    {id: 'hair_color', label: 'Color de Cabello'},
    {id: 'eye_color', label: 'Color de Ojos'},
    {id: 'birth_year', label: 'Fecha de Nacimiento'},
    {id: 'gender', label: 'Género'},
    {id: 'homeworld', label: 'Planeta de Nacimiento'},
]
useEffect(() => {
    console.log(personajes);
}, [personajes]);
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

  const closeModal = () => setIsModalOpen(false);
return(

    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <ExtraInfoModal isOpen={isModalOpen} onClose={closeModal} info={item}></ExtraInfoModal>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {personajes
              .slice(pagina * filasPPag, pagina * filasPPag + filasPPag)
              .map((personaje) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={personaje.name} onClick={() => {setItem(personaje); setIsModalOpen(true)}}>
                    {columns.map((column) => {
                      const value = personaje[column.id];
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
        count={personajes.length}
        rowsPerPage={filasPPag}
        page={pagina}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      
    </Paper>
  );
}
export default TablaPersonajes;