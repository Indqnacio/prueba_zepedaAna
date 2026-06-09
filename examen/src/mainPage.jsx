import {useState, useEffect} from 'react'
import TablaPersonajes from './tablaPersonajes'
import ExtraInfoModal from './extraInfoModal'
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import AppBar from '@mui/material/AppBar';
import { styled, alpha } from '@mui/material/styles';
import axios from "axios";

export default function MainPage() {

    const [personajes, setPersonajes] = useState([]);
    //const [filteredData, setFilteredData] = useState([]);
    const [planetas, setPlanetas] = useState([]);
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
        setPersonajes(datos)
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
        const filtered = personajes.filter(personaje =>
            personaje.name.toLowerCase().includes(searchText.toLowerCase())
        );
        
        setPersonajes(filtered);
        //setFilteredData(filtered);
    }
    useEffect(() => {
        filterData();
    }, [searchText]);
    return (
        <>
        <h1>Personajes de Star Wars</h1>
        <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            MUI
          </Typography>
          <Search>
            <SearchIconWrapper>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Search>
        </Toolbar>
      </AppBar>
        <TablaPersonajes personajes={personajes}></TablaPersonajes>
        </>
        
    )
}