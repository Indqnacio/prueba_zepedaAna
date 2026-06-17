import { useState, useEffect } from "react";
import axios from "axios";
import TableData from "./tableData";
import CharactersModal from "./modals/characters";

export default function CharactersPage(){
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [characters, setCharacters] = useState([])
    const [filteredCharacters, setFilteredCharacters] = useState([])
    const [totalPages, setTotalPages] = useState(0);
    const [films, setFilms] = useState([])
    const [index, setIndex]=useState(1);
    const [modalMode, setModalMode] = useState('creating')
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const columns = [
    {id: 'name', label: 'Nombre', minWidth:60 },
    {id: 'height', label: 'Altura', format: (value) => value.toFixed(2)},
    {id: 'mass', label: 'Peso', format: (value) => value.toFixed(2)},
    {id: 'skin_color', label: 'Color de Piel'},
    {id: 'hair_color', label: 'Color de Cabello'},
    {id: 'eye_color', label: 'Color de Ojos'},
    {id: 'birth_year', label: 'Fecha de Nacimiento'},
    {id: 'gender', label: 'Género'},
    {id: 'actions',label:'Acciones'}
//    {id: 'homeworld', label: 'Planeta de Nacimiento'},
]
useEffect(() => {
        console.log(films)
    }, [films]);

        async function fetchMovies(){
      const res = await axios.get('http://localhost:3000/getPeliPerso')
      const data = res.data.docs
      setFilms(data)
    }
    const fetchCharacters = async() => {
        const res = await axios.get(`http://localhost:3000/getPersonajes?page=${index}&limit=10`);
        const datos = res.data.docs;
        setCharacters(datos)
        setFilteredCharacters(datos);
        setTotalPages(res.data.totalPages)
    }
    useEffect(()=>{
        fetchCharacters();
        fetchMovies();
    },[index])
    async function nextPage() {
         setIndex(index+1)
    }
    async function prevPage() {
         setIndex(index-1)
    }
     const handleCreating = ()=>{
        setModalMode("creating")
        setSelectedCharacter(null)
        setIsModalOpen(true)
    }

    const handleEditing = (character)=>{
        setModalMode("editing")
        setSelectedCharacter(character)
        setIsModalOpen(true)
        console.log("se disparo handle editing")
    }
    const handleViewing = (character)=>{
        setModalMode("viewing")
        setSelectedCharacter(character)
        setIsModalOpen(true)
    }
    const handleDeleting = ()=>{
        
    }
    const handleSaving = async (datos)=>{
        console.log("Quiere guardar")
        console.log("MOdal mode ", modalMode)
        if(modalMode === "editing"){
            console.log("datos a actualizar ", datos)
            const res= await axios.put("http://localhost:3000/putPersonaje", datos)
            console.log(res)
        };
        alert("Personaje guardado con éxito")
        if(modalMode === "creating"){
            console.log("datos a postear ", datos)
           const res= await axios.post("http://localhost:3000/postPersonaje", datos)
           console.log(res)
        };
        fetchCharacters();
    }
    return(
        <>
        <div className="w-full">
            <h1>Personajes de Starwars</h1>
             <button onClick={handleCreating} className={"hover: cursor-pointer"}> Agregar Personaje</button>
            {characters && characters.length>0?(
                <TableData columns={columns} onView={handleViewing} onEdit={handleEditing} data={characters}/>
            ):(
                <p>Cargando información...</p>
            )}
            <div className="flex">
                
                <button disabled={index===1} className={"hover: cursor-pointer border "} onClick={prevPage}>Página Anterior</button>
                <button disabled={index===totalPages} className={"hover: cursor-pointer border"} onClick={nextPage}>Página Siguiente</button>
                <p>Página: {index}/{totalPages}</p>
            </div>
            <CharactersModal mode={modalMode} isOpen={isModalOpen} modal={modalMode} onClose={()=>{setIsModalOpen(false); setSelectedCharacter(null)}} data={selectedCharacter} onSave={handleSaving}></CharactersModal>
        </div>

        </>
        
    )
}