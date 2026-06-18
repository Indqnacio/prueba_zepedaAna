import {useState, useEffect} from 'react'
import TablaPersonajes from './tablaPersonajes'
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import AppBar from '@mui/material/AppBar';
import Sidebar from './sidebar';
import MoviesPage from './moviesPage';
import CharactersPage from './charactersPage';
import VehiclesPage from './vehiclesPage';
import StarshipsPage from './starshipsPage';
import SpeciesPage from './speciesPage';
import PlanetsPage from './planetsPage';
import { styled, alpha } from '@mui/material/styles';
import axios from "axios";

export default function MainPage() {

    //const [characters, setCharacters] = useState([]);
    //const [filteredCharacters, setFilteredCharacters] = useState([]);
    //const [planets, setPlanets] = useState([]);
    //const [searchText, setSearchText] = useState("");

    const [activePage, setActivePage] = useState("characters");
    const renderPage = () =>{
        switch(activePage){
            case 'characters':
                return <CharactersPage/>
            case 'movies':
                return <MoviesPage/>
            case 'vehicles':
                return <VehiclesPage/>
            case 'starships':
                return <StarshipsPage/>
            case 'species':
                return <SpeciesPage/>
            case 'planets':
                return <PlanetsPage/>
        }
    }

   /* const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
     width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    }));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));*/

    function filterData() {
        const filtered = characters.filter(personaje =>
            personaje.name.toLowerCase().includes(searchText.toLowerCase())
        );
        
        setFilteredCharacters(filtered);
    }

    function handleSearchChange(event) {
        setSearchText(event.target.value);
    }
    return (
        <>
        <div className='flex'>
            <div className='flex bg-slate-950 h-screen text-slate-100 overflow-hidden'>
                <Sidebar activePage={activePage} setActivePage={setActivePage}/>
            </div>
            <main className='flex-1 h-screen flex w-full flex-col p-8 transition-all duration-300'>
                <div className='p-6 h-[80vh] w-full'>{renderPage()}</div>
            </main>
        </div>
        </>
    )
}