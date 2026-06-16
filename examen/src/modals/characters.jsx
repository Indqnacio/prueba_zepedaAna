import react from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import { useFormik } from "formik";
import * as Yup from 'yup';
export default function CharactersModal({isOpen, onClose, data}){
    const [species, setSpecies] = useState([])
    const [movies, setMovies] = useState([])
    const [planets, setPlanets] = useState([])
    const [vehicles, setVehicles] = useState([])
    const [starships, setStarships] = useState([])
    const [index, setIndex] = useState(1)

    async function fetchVehicles(){
        let allData = []
        let currentPage=1;
        let isMoreData=true;
        let aux = true
        while(isMoreData){
             const res = await axios.get(`http://localhost:3000/getVehiculos?page=${index}&limit=10`)
            aux=res.data.hasNextPage;
             if (aux==true){
                setIndex(index+1)
                const aux = res.data.docs
                allData.push(aux)
                
             }else{
                isMoreData = false
             }
        }
        setVehicles(allData);
    }
    async function fetchPlanets(){
        const res = await axios.get('localhost:3000/getPlanetas?page=1&limit=82')
        const data = res.data.docs
        setPlanets(data)
    }
    async function fetchSpecies(){
    }
    async function fetchStarships(){

    }
    async function fetchMovies(){

    }
    useEffect(() => {
        fetchVehicles()
    }, [index]);

     useEffect(() => {
        console.log(vehicles);
    }, [vehicles]);

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
            films: Yup.array(),
            homeworld: Yup.string(),
            species: Yup.array(),
            starships: Yup.array(),
            vehicles: Yup.array()
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
                const response = await axios.post('http://localhost:3000/postPeli', values);
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
    
  /*  useEffect(()=>{
        console.log(vehicles)
    },[vehicles])*/
    return(
         <>
             <div className="fixed inset-0 z-50 overflow-hidden">
                <div className="absolute inset-0 bg-black/50 transition-opacity" onClick={onClose}></div>
                <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md transform transition-all ease-in-out duration-500 sm:duration-700">
          <div className="h-full flex flex-col bg-white shadow-xl overflow-y-auto">
            
            {/* Modal Header */}
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
                
                {/* Name Field */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">Nombre</label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  />
                  {formik.touched.title && formik.errors.title ? (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.title}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="director" className="block text-sm font-medium text-gray-700">Director</label>
                  <input
                    id="director"
                    name="director"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.director}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  />
                  {formik.touched.director && formik.errors.director ? (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.director}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">Producer</label>
                  <input
                    id="producer"
                    name="producer"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.producer}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  />
                  {formik.touched.producer && formik.errors.producer ? (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.producer}</div>
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