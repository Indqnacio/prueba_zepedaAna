import {useState, useEffect} from 'react'
import TablaPersonajes from './tablaPersonajes'
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import AppBar from '@mui/material/AppBar';
import Sidebar from './sidebarPage';
import { styled, alpha } from '@mui/material/styles';
import axios from "axios";

export default function MainPage() {

    const [characters, setCharacters] = useState([]);
    const [filteredCharacters, setFilteredCharacters] = useState([]);
    const [planets, setPlanets] = useState([]);
    const [searchText, setSearchText] = useState("");

    const fetchPersonajes = async() => {
        const res = await axios.get('https://swapi.info/api/people');
        const datos = res.data;
        
        datos.forEach(async (personaje) => {
            const resPlaneta = await axios.get(personaje.homeworld);
            const planeta = resPlaneta.data.name;
            personaje.homeworld = planeta;
        });
        console.log("informacion ",datos[0].films);
        setCharacters(datos)
        setFilteredCharacters(datos);
    }
    const fetchPlanetas = async(aux) => {
        const res = await axios.get(`${aux}}`);
        const datos = await res.data;
        return(datos.name);
    }

    const Search = styled('div')(({ theme }) => ({
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
}));

    useEffect(() => {
        fetchPersonajes();
        fetchPlanetas();
    },[]);

    function filterData() {
        const filtered = characters.filter(personaje =>
            personaje.name.toLowerCase().includes(searchText.toLowerCase())
        );
        
        setFilteredCharacters(filtered);
    }

    function handleSearchChange(event) {
        setSearchText(event.target.value);
    }
    useEffect(() => {
        filterData();
    }, [searchText]);
    return (
        <>
        <Sidebar></Sidebar>
        <div></div>
        <h1>Personajes de Star Wars</h1>
        <AppBar position="static">
        <Toolbar>
          <Search>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchText}
              autoFocus
              onChange={handleSearchChange}
            />
          </Search>
        </Toolbar>
      </AppBar>
        <TablaPersonajes personajes={filteredCharacters}></TablaPersonajes>
        </>
    )
}