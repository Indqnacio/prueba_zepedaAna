import react from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import { useFormik } from "formik";
import * as Yup from 'yup';
import {Loader2, X} from 'lucide-react';
import { Select, Chip, MenuItem, FormControl } from "@mui/material";
export default function CharactersModal({isOpen, onClose, data, mode, onSave}){
    const isReadOnly = mode ==="viewing";
    const isEditing = mode === "editing";
    
    const [species, setSpecies] = useState([])
    const [selectedSpecies, setSelectedSpecies]=useState([])
    const [films, setFilms] = useState([])
    const [selectedFilms, setSelectedFilms]=useState([])
    const [planets, setPlanets] = useState([])
    const [selectedPlanets, setSelectedPlanets]=useState([])
    const [vehicles, setVehicles] = useState([])
    const [selectedVehicles, setSelectedVehicles]=useState([])
    const [starships, setStarships] = useState([])
    const [selectedStarships, setSelectedStarships]=useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [index, setIndex] = useState(1)
    async function fetchVehicles(){
        const res = await axios.get('http://localhost:3000/getVehiculoPerso')
        const data = res.data
        setVehicles(data)
    }
    async function fetchPlanets(){
        const res = await axios.get('http://localhost:3000/getPlanetaPerso')
        const data = res.data
        setPlanets(data)
    }
    async function fetchSpecies(){
      const res = await axios.get('http://localhost:3000/getEspeciePerso')
      const data = res.data
      setSpecies(data)
    }
    async function fetchStarships(){
      const res = await axios.get('http://localhost:3000/getNavePerso')
      const data = res.data
      setStarships(data)
    }
    async function fetchMovies(){
      const res = await axios.get('http://localhost:3000/getPeliPerso')
      console.log(res)
      const data = res.data
      setFilms(data)
    }
     useEffect(() => {
        fetchVehicles();
        fetchPlanets();
        fetchSpecies();
        fetchStarships();
        fetchMovies();
        setIsLoading(false)
    }, []);

    useEffect(()=>{
      console.log("modal mode ", mode)
    },[mode])

    const handleMoviesOnChange=(event)=>{
      setSelectedFilms(event.target.value);
      console.log("Pelicula seleccionada ", event.target.value);
    }

    const handleSpeciesOnChange=(event)=>{
      setSelectedSpecies(event.target.value);
      console.log("Especie seleccionada ", event.target.value);
    }
    const handleVehiclesOnChange=(event)=>{
      setSelectedVehicles(event.target.value);
      console.log("Vehículo seleccionado ", event.target.value);
    }
    const handlePlanetOnChange=(event)=>{
      setSelectedPlanets(event.target.value);
      console.log("Planeta seleccionado ", event.target.value);
    }
    const handleStarshipsOnChange=(event)=>{
      setSelectedStarships(event.target.value);
      console.log("Nave seleccionada ", event.target.value);
    }
    const validationSchema=Yup.object({
            name: Yup.string()
            .required('El nombre es obligatorio'),
            birth_year: Yup.string(),
            eye_color: Yup.string(),
            gender: Yup.string(),
            hair_color: Yup.string(),
            height: Yup.string(),
            mass: Yup.string(),
            skin_color: Yup.string(),
            films: Yup.mixed(),
            homeworld: Yup.string(),
            species: Yup.mixed(),
            starships: Yup.mixed(),
            vehicles: Yup.mixed()
        });

        const formik = useFormik({
        initialValues:{
            _id: data?._id||'',
            name: data?.name||'',
            birth_year: data?.birth_year||'',
            eye_color: data?.eye_color||'',
            gender: data?.gender || '',
            hair_color: data?.hair_color||'',
            height: data?.height||'',
            mass: data?.mass||'',
            skin_color: data?.skin_color||'',
            films: data?.films||[],
            homeworld: data?.homeworld||'',
            species: data?.species||[],
            starships: data?.starships||[],
            vehicles: data?.vehicles||[],
        }, validationSchema: validationSchema,
        enableReinitialize:true,
        onSubmit: async(values, {setSubmitting, resetForm}) =>{
            try{
                const data={
                  ...values,
                  starships: values.starships.map((starship)=>starship._id||starship),
                  vehicles: values.vehicles.map((vehicle)=>vehicle._id||vehicle),
                  films: values.films.map((film)=>film._id||film),
                  species: values.species.map((specie)=>specie._id||specie)
                }
                const payload={...data}
                if(!payload._id){
                  delete payload._id
                  console.log("se elimino")
                }
                if(!payload.homeworld){
                  delete payload.homeworld
                }
               /* const response = await axios.post('http://localhost:3000/postPersonaje', data);
                c*/
                await onSave(payload);
               // console.log("Form mandado exitosamente ", data);
                
                resetForm();
                onClose();
            }catch(error){
                console.error("Error mandando los datos: ", error)
                alert('Fallo al guardar cambios ', error);
            } finally{
              setSubmitting(false);
            }
        }
    });
    if(!isOpen) return null;
    return(
      <>
        <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-black/50 transition-opacity" onClick={onClose}></div>
            <div className="absolute inset-y-0 right-0 max-w-full flex">
              <div className="w-screen max-w-md transform transition-all ease-in-out duration-500 sm:duration-700">
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-auto">

                  <div className="px-4 py-6 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                    {isEditing?(<h2 className="text-lg font-medium text-gray-900">Editar Personaje</h2>):(<h2 className="text-lg font-medium text-gray-900">REgistrar Nuevo Personaje</h2>)}
                    <button 
                      onClick={onClose}
                      className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                    </button>
                  </div>

                  <div className="mt-6 relative flex-1 px-4 sm:px-6">
                    <form onSubmit={formik.handleSubmit} className="space-y-6">

                      <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    disabled={isReadOnly}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.name}</div>
                  ) : null}
                      </div>
                      <div>
                  <label htmlFor="birth_year" className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
                  <input
                    id="birth_year"
                    name="birth_year"
                    type="text"
                    disabled={isReadOnly}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.birth_year}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  />
                  {formik.touched.birth_year && formik.errors.birth_year ? (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.birth_year}</div>
                  ) : null}
                  </div>
                  <div>
                  <label htmlFor="eye_color" className="block text-sm font-medium text-gray-700">Color de Ojos</label>
                  <input
                    id="eye_color"
                    name="eye_color"
                    type="text"
                    disabled={isReadOnly}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.eye_color}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  />
                  {formik.touched.eye_color && formik.errors.eye_color ? (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.eye_color}</div>
                  ) : null}
                  </div>
                  <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Género</label>
                  <input
                    id="gender"
                    name="gender"
                    type="text"
                    disabled={isReadOnly}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.gender}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  />
                  {formik.touched.gender && formik.errors.gender ? (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.gender}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="hair_color" className="block text-sm font-medium text-gray-700">Color de Cabello</label>
                  <input
                    id="hair_color"
                    name="hair_color"
                    type="text"
                    disabled={isReadOnly}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.hair_color}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  />
                  {formik.touched.hair_color && formik.errors.hair_color ? (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.hair_color}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="height" className="block text-sm font-medium text-gray-700">Altura</label>
                  <input
                    id="height"
                    name="height"
                    type="number"
                    disabled={isReadOnly}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.height}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  />
                  {formik.touched.height && formik.errors.height ? (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.height}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="mass" className="block text-sm font-medium text-gray-700">Peso</label>
                  <input
                    id="mass"
                    name="mass"
                    type="text"
                    disabled={isReadOnly}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.mass}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  />
                  {formik.touched.mass && formik.errors.mass ? (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.mass}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="skin_color" className="block text-sm font-medium text-gray-700">Color de Piel</label>
                  <input
                    id="skin_color"
                    name="skin_color"
                    type="text"
                    disabled={isReadOnly}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.skin_color}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  />
                  {formik.touched.skin_color && formik.errors.skin_color ? (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.skin_color}</div>
                  ) : null}
                </div>

                 <div>
                  <label htmlFor="planets" className="font-medium text-gray-700">Planeta</label>
                  <select 
                  name="planet" 
                  id="planet"
                  disabled={isLoading}
                  disabled={isReadOnly}
                  value={formik.values.homeworld}
                  onChange={(e)=>{
                    formik.setFieldValue('homeworld', e.target.value)
                  }}
                  className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:online-none bg-white min-h-[100px]"
                  >
                  {isLoading ? (
                    <option>Cargando Opciones</option>
                  ): (
                    planets.map(opt=>(
                      <option key={opt._id} value={opt._id}>{opt.name}</option>
                    ))
                  )}
                    
                  </select>
                </div>
                  <div className="border border-slate-800 bg-slate-950/40 p-5 rounded-xl space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Especie</label>
                      {!isReadOnly && (
                        <FormControl fullWidth size="small">
                        <Select displayEmpty
                        disabled={isReadOnly}
                        value=""
                        onChange={(event) =>{
                          const selection = event.target.value;
                          const specieObject = species.find(n=>n._id === selection);
                          if(specieObject && !formik.values.species.some(n=>(n._id||n)===selection)){
                            formik.setFieldValue('species',[...formik.values.species, specieObject]);
                          }
                        }}
                        sx={{bgcolor: '#bfc1c7',
                          color: '#94a3b8',
                          '.MuiOutlinedInput-notchedOutline': {borderColor:'#1e293b'},
                          '&:hover .MuiOutlinedInput-notchedOutline': {borderColor: '#3b82f6'},
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline':{borderColor: '#3b82f6'}
                        }}
                        MenuProps={{ paperprops:{sx:{bgcolor:'#0f172a', color: '#f8fafc'}}}}
                        >
                          <option value="" disabled className="text-slate-500">Elija una especie</option>
                          {species.map((specie)=>(
                            <MenuItem key={specie._id} id={specie._id} value={specie._id}>
                              {specie.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      )}
                      {formik.touched.species && formik.errors.species && (
                        <div className="text-rose-500 text-xs mt-1">{formik.errors.species}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {formik.values.species.length === 0 && (
                      <p className="text-xs text-slate-500 italic">Ninguna Especie seleccionada.</p>
                    )}
                    {formik.values.species.map((specie)=>{ 
                      const specieData = specie.name? specie: species.find(n=>n._id===specie) || {name: specie};
                      return(
                      <div
                      key={specie}
                      className="flex items-center gap-2 bg-blue-600/10 border border-blue-500/30 text-black-200 px-3 py-1.5 rounded-xl text-sm font-medium animate-in faded-in zoom-in-95 duration-150">
                        <span>{specie.name}</span>
                        {!isReadOnly && (
                          <button type="button" onClick={()=>{const newArray = formik.values.species.filter(item => item !== specie);
                            formik.setFieldValue('species', newArray);
                          }}
                          className="hover:bg-blue-500/20 p-0.5 rounded-md transition-colors cursor-pointer text-blue-400">
                           <X size={14}/> 
                          </button>
                        )}  
                      </div>
                    )})}
                  </div>

                   <div className="border border-slate-800 bg-slate-950/40 p-5 rounded-xl space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Naves</label>
                      {!isReadOnly &&(
                         <FormControl fullWidth size="small">
                        <Select displayEmpty
                        disabled={isReadOnly}
                        value=""
                        onChange={(event) =>{
                          const selection = event.target.value;
                          const starshipObject = starships.find(n=>n._id === selection);
                          if(starshipObject && !formik.values.starships.some(n=>(n._id||n)===selection)){
                            formik.setFieldValue('starships',[...formik.values.starships, starshipObject]);
                          }
                        }}
                        sx={{bgcolor: '#bfc1c7',
                          color: '#94a3b8',
                          '.MuiOutlinedInput-notchedOutline': {borderColor:'#1e293b'},
                          '&:hover .MuiOutlinedInput-notchedOutline': {borderColor: '#3b82f6'},
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline':{borderColor: '#3b82f6'}
                        }}
                        MenuProps={{ paperprops:{sx:{bgcolor:'#0f172a', color: '#f8fafc'}}}}
                        >
                          <option value="" disabled className="text-slate-500">Elija una nave</option>
                          {starships.map((starship)=>(
                            <MenuItem key={starship._id} id={starship._id} value={starship._id}>
                              {starship.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      )}
                      {formik.touched.starships && formik.errors.starships && (
                        <div className="text-rose-500 text-xs mt-1">{formik.errors.starships}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {formik.values.starships.length === 0 && (
                      <p className="text-xs text-slate-500 italic">Ninguna Nave seleccionada.</p>
                    )}
                    {formik.values.starships.map((starship)=>{ 
                      const specieData = starship.name? starship: starships.find(n=>n._id===starship) || {name: starship};
                      return(
                      <div
                      key={starship}
                      className="flex items-center gap-2 bg-blue-600/10 border border-blue-500/30 text-black-200 px-3 py-1.5 rounded-xl text-sm font-medium animate-in faded-in zoom-in-95 duration-150">
                        <span>{starship.name}</span>
                        {!isReadOnly && (
                          <button type="button" onClick={()=>{const ArrayShips = formik.values.starships.filter(item => item !== starship);
                            formik.setFieldValue('starships', ArrayShips);
                          }}
                          className="hover:bg-blue-500/20 p-0.5 rounded-md transition-colors cursor-pointer text-blue-400">
                           <X size={14}/> 
                          </button>
                        )}  
                      </div>
                    )})}
                  </div>

                    <div className="border border-slate-800 bg-slate-950/40 p-5 rounded-xl space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Vehículos</label>
                      {!isReadOnly &&(
                        <FormControl fullWidth size="small">
                        <Select displayEmpty
                        disabled={isReadOnly}
                        value=""
                        onChange={(event) =>{
                          const selection = event.target.value;
                          const vehicleObject = vehicles.find(n=>n._id === selection);
                          if(vehicleObject && !formik.values.vehicles.some(n=>(n._id||n)===selection)){
                            formik.setFieldValue('vehicles',[...formik.values.vehicles, vehicleObject]);
                          }
                        }}
                        sx={{bgcolor: '#bfc1c7',
                          color: '#94a3b8',
                          '.MuiOutlinedInput-notchedOutline': {borderColor:'#1e293b'},
                          '&:hover .MuiOutlinedInput-notchedOutline': {borderColor: '#3b82f6'},
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline':{borderColor: '#3b82f6'}
                        }}
                        MenuProps={{ paperprops:{sx:{bgcolor:'#0f172a', color: '#f8fafc'}}}}
                        >
                          <option value="" disabled className="text-slate-500">Elija una vehículo</option>
                          {vehicles.map((vehicle)=>(
                            <MenuItem key={vehicle._id} id={vehicle._id} value={vehicle._id}>
                              {vehicle.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      )}
                      
                      {formik.touched.species && formik.errors.species && (
                        <div className="text-rose-500 text-xs mt-1">{formik.errors.species}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {formik.values.vehicles.length === 0 && (
                      <p className="text-xs text-slate-500 italic">Ningún Vehículo seleccionado.</p>
                    )}
                    {formik.values.vehicles.map((vehicle)=>{ 
                      const vehicleData = vehicle.name? vehicle: vehicle.find(n=>n._id===vehicle) || {name: vehicle};
                      return(
                      <div
                      key={vehicle}
                      className="flex items-center gap-2 bg-blue-600/10 border border-blue-500/30 text-black-200 px-3 py-1.5 rounded-xl text-sm font-medium animate-in faded-in zoom-in-95 duration-150">
                        <span>{vehicle.name}</span>
                        {!isReadOnly && (
                          <button type="button" onClick={()=>{const newArray = formik.values.vehicles.filter(item => item !== vehicle);
                            formik.setFieldValue('vehicles', newArray);
                          }}
                          className="hover:bg-blue-500/20 p-0.5 rounded-md transition-colors cursor-pointer text-blue-400">
                           <X size={14}/> 
                          </button>
                        )}  
                      </div>
                    )})}
                  </div>
                    <div className="border border-slate-800 bg-slate-950/40 p-5 rounded-xl space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Películas</label>
                      {!isReadOnly && (
                        <FormControl fullWidth size="small">
                        <Select displayEmpty
                        disabled={isReadOnly}
                        value=""
                        onChange={(event) =>{
                          const selection = event.target.value;
                          const filmObject = films.find(n=>n._id === selection);
                          if(filmObject && !formik.values.films.some(n=>(n._id||n)===selection)){
                            formik.setFieldValue('films',[...formik.values.films, filmObject]);
                          }
                        }}
                        sx={{bgcolor: '#bfc1c7',
                          color: '#94a3b8',
                          '.MuiOutlinedInput-notchedOutline': {borderColor:'#1e293b'},
                          '&:hover .MuiOutlinedInput-notchedOutline': {borderColor: '#3b82f6'},
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline':{borderColor: '#3b82f6'}
                        }}
                        MenuProps={{ paperprops:{sx:{bgcolor:'#0f172a', color: '#f8fafc'}}}}
                        >
                          <option value="" disabled className="text-slate-500">Elija una película</option>
                          {films.map((film)=>(
                            <MenuItem key={film._id} id={film._id} value={film._id}>
                              {film.title}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      )}
                      
                      {formik.touched.films && formik.errors.films && (
                        <div className="text-rose-500 text-xs mt-1">{formik.errors.films}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {formik.values.films.length === 0 && (
                      <p className="text-xs text-slate-500 italic">Ninguna película seleccionada.</p>
                    )}
                    {formik.values.films.map((film)=>{ 
                      const specieData = film.title? film: films.find(n=>n._id===film) || {title: film};
                      return(
                      <div
                      key={film}
                      className="flex items-center gap-2 bg-blue-600/10 border border-blue-500/30 text-black-200 px-3 py-1.5 rounded-xl text-sm font-medium animate-in faded-in zoom-in-95 duration-150">
                        <span>{film.title}</span>
                        {!isReadOnly && (
                          <button type="button" onClick={()=>{const MoviesArray = formik.values.films.filter(item => item !== film);
                            formik.setFieldValue('films', MoviesArray);
                          }}
                          className="hover:bg-blue-500/20 p-0.5 rounded-md transition-colors cursor-pointer text-blue-400">
                           <X size={14}/> 
                          </button>
                        )}  
                      </div>
                    )})}
                  </div>
                {!isReadOnly?( 
                  <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={onClose}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="inline-flex justify-center bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none disabled:bg-indigo-300"
                  >
                    {formik.isSubmitting ? 'Guardando...' : 'Guardar'}
                  </button>
                </div>):(
                   <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={onClose}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                  >
                    Cerrar
                  </button>
                  </div>
                )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div> 
      </>
        
    )
}