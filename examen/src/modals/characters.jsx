import react from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Select, Chip } from "@mui/material";
export default function CharactersModal({isOpen, onClose, data}){
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
            name: data?.title||'',
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
        onSubmit: async(values, {setSubmitting, resetForm}) =>{
            try{
                console.log(values)
                const response = await axios.post('http://localhost:3000/postPersonaje', values);
                console.log("Form mandado exitosamente ", response.data);
                alert('Data enviado')
                resetForm();
                onClose();
            }catch(error){
                console.error("Error mandando los datos: ", error)
                alert('fallo al submit ', error);
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
                {data?(<h2 className="text-lg font-medium text-gray-900">Editar Personaje</h2>):(<h2 className="text-lg font-medium text-gray-900">REgistrar Nuevo Personaje</h2>)}
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
                  <label htmlFor="films" className="font-medium text-gray-700">Películas</label>
                  <select 
                  name="films" 
                  id="films"
                  multiple={true}
                  disabled={isLoading}
                  value={formik.values.films}
                  onChange={(e)=>{
                    const selectedOptions = Array.from(e.target.selectedOptions,option=>option.value);
                    formik.setFieldValue('films', selectedOptions);
                  }}
                  onBlur={formik.handleBlur}
                  className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:online-none bg-white min-h-[100px]"
                  >
                  {isLoading ? (
                    <option>Cargando Opciones</option>
                  ): (
                    films.map(opt=>(
                      <option key={opt._id} value={opt._id}>{opt.title}</option>
                    ))
                  )}
                    
                  </select>
                </div>

                <div>
                  <label htmlFor="planets" className="font-medium text-gray-700">Planetas</label>
                  <select 
                  name="planets" 
                  id="planets"
                  disabled={isLoading}
                  value={formik.values.homeworld}
                  onChange={(e)=>{
                    //const selectedOption = (e.target.selectedOptions,option=>option.value);
                    formik.setFieldValue('planets', (e.target.selectedOptions,option=>option.value))
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

                <div>
                  <label htmlFor="species" className="font-medium text-gray-700">Especies</label>
                  <select 
                  name="species" 
                  id="species"
                  disabled={isLoading}
                  value={selectedSpecies}
                  onChange={handleSpeciesOnChange}
                  className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:online-none bg-white min-h-[100px]"
                  >
                  {isLoading ? (
                    <option>Cargando Opciones</option>
                  ): (
                    species.map(opt=>(
                      <option key={opt._id} value={opt._id}>{opt.name}</option>
                    ))
                  )}
                    
                  </select>
                </div>

                <div>
                  <label htmlFor="starships" className="font-medium text-gray-700">Naves</label>
                  <select 
                  name="starships" 
                  id="starships"
                  disabled={isLoading}
                  value={selectedStarships}
                  onChange={handleStarshipsOnChange}
                  className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:online-none bg-white min-h-[100px]"
                  >
                  {isLoading ? (
                    <option>Cargando Opciones</option>
                  ): (
                    starships.map(opt=>(
                      <option key={opt._id} value={opt._id}>{opt.name}</option>
                    ))
                  )}
                    
                  </select>
                </div>

                <div>
                  <label htmlFor="vehicles" className="font-medium text-gray-700">Vehículos</label>
                  <select
                  name="vehicles" 
                  id="vehicles"
                  disabled={isLoading}
                  value={selectedVehicles}
                  onChange={handleVehiclesOnChange}
                  className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:online-none bg-white min-h-[100px]"
                  >
                  {isLoading ? (
                    <option>Cargando Opciones</option>
                  ): (
                    vehicles.map(opt=>(
                      <option key={opt._id} value={opt._id}>{opt.name}</option>
                    ))
                  )}
                    
                  </select>
                </div>

                <div>
                  <label htmlFor="skin_color" className="block text-sm font-medium text-gray-700">Color de Piel</label>
                  <input
                    id="skin_color"
                    name="skin_color"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.skin_color}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  />
                  {formik.touched.skin_color && formik.errors.skin_color ? (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.skin_color}</div>
                  ) : null}
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={onClose}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="inline-flex justify-center bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none disabled:bg-indigo-300"
                  >
                    {formik.isSubmitting ? 'Guardando...' : 'Guardar'}
                  </button>
                </div>
              </form>
            </div>
            
          </div>
        </div>
      </div>
      </div> 
        </>
        
    )
}