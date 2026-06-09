import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import axios from "axios";

export default function ExtraInfoModal({ isOpen, onClose, info }) {

    const [peliculas, setPeliculas] = useState([]);
    const [vehiculos, setVehiculos] = useState([]);
    function fetchVehicles() {
        info.vehicles.forEach(async (vehiculo) => {
            const resVehiculo = await axios.get(vehiculo);
            const vehiculoData = resVehiculo.data.name;
            setVehiculos((prevVehiculos) => [...prevVehiculos, vehiculoData]);
        });
    }
    function fetchFilms() {
        info.films.forEach(async (pelicula) => {
            const resPelicula = await axios.get(pelicula);
            const peliculaData = resPelicula.data.title;
            setPeliculas((prevPeliculas) => [...prevPeliculas, peliculaData]);
        });
    }
    useEffect(() => {
        if (isOpen) {
            fetchVehicles();
            fetchFilms();
            setVehiculos([]);
            setPeliculas([]);
        }
    }, [isOpen]);
    return(
        <div>
            <Modal
                open={isOpen}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
                     <Typography id="modal-modal-title" variant="h6" component="h2">
                        Información adicional
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Aparece en las Peliculas:
                       {peliculas.map((pelicula, index) => (
                            <li key={index}>{pelicula}</li>
                        ))}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Vehículos:
                        {vehiculos.length === 0 ? (<p>No tiene vehículos</p>) : 
                         vehiculos.map((vehiculo, index) => (
                            <li key={index}>{vehiculo}</li>
                        ))
                        }
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}