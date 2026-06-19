import {useState, useEffect} from "react"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Divider } from "@mui/material";
import { CircleX } from "lucide-react";
export default function SpeciesModal({isOpen, onClose, data, mode, onSave}){
    const isReadOnly = mode ==="viewing";
    const isEditing = mode === "editing";
    console.log("DATOS A VISUALIZAR ", data)
    const [planets, setPlanets] = useState([])

    async function fetchPlanets(){
        const res = await axios.get('http://localhost:3000/getPlanetaPerso')
        const data = res.data
        setPlanets(data)
    }
    useEffect(()=>{
        fetchPlanets();
    },[])
    const validationSchema=Yup.object({
            name: Yup.string()
            .required('El nombre es obligatorio'),
            classification: Yup.string(),
            designation: Yup.string(),
            average_height: Yup.string(),
            average_lifespan: Yup.string(),
            eye_colors: Yup.string(),
            hair_colors: Yup.string(),
            skin_colors: Yup.string(),
            language: Yup.string(),
            homeworld: Yup.string()
            .required('El planeta es obligatorio')
        });

        const formik = useFormik({
        initialValues:{
            _id: data?._id||'',
            name: data?.name||'',
            classification: data?.classification || '',
            designation: data?.designation||'',
            average_height: data?.average_height||'',
            average_lifespan: data?.average_lifespan||'',
            eye_colors: data?.eye_colors||'',
            hair_colors: data?.hair_colors||'',
            skin_colors: data?.skin_colors||'',
            language: data?.language||'',
            homeworld: data?.homeworld||'',


        }, validationSchema: validationSchema,
        enableReinitialize:true,
        onSubmit: async(values, {setSubmitting, resetForm}) =>{
            try{
              const payload={...values}
              if(!payload._id){
                delete payload._id
              }
              console.log(payload)
              await onSave(payload);
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
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-end">
                <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-500" onClick={onClose}></div>
                <div className="w-full max-w-2xl h-full bg-gray-100 border-1 border-gray-50 round round-xl shadow-2xl relative z-10 text-slate-100 flex flex-col">
                  <div className="px-6 py-5 bg-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">{isEditing?"Editar Especie":"Agregar Especie"}</h2>
                <button onClick={onClose} className="text-slate-400 hover:text-black transition-colors cursor-pointer">
                  <CircleX/>
                </button>
                  </div>
                  <div className="p-6 flex-1 overflow-y-auto">
                      <form onSubmit={formik.handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    className="mt-1 block w-full rounded-md text-gray-900 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.name}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="classification" className="block text-sm font-medium text-gray-700">Clasificación</label>
                  <input
                    id="classification"
                    name="classification"
                    type="text"
                    disabled={isReadOnly}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.classification}
                    className="mt-1 block w-full text-gray-900 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  />
                  {formik.touched.classification && formik.errors.classification ? (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.classification}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="designation" className="block text-sm font-medium text-gray-700">Designación</label>
                  <input
                    id="designation"
                    name="designation"
                    type="text"
                    disabled={isReadOnly}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.designation}
                    className="mt-1 block w-full text-gray-900 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  />
                  {formik.touched.designation && formik.errors.designation ? (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.designation}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="average_height" className="block text-sm font-medium text-gray-700">Altura Promedio</label>
                  <input
                    id="average_height"
                    name="average_height"
                    type="text"
                    disabled={isReadOnly}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.average_height}
                    className="mt-1 block w-full text-gray-900 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  />
                  {formik.touched.average_height && formik.errors.average_height ? (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.average_height}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="average_lifespan" className="block text-sm font-medium text-gray-700">Esperanza de Vida</label>
                  <input
                    id="average_lifespan"
                    name="desaverage_lifespanignation"
                    type="text"
                    disabled={isReadOnly}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.average_lifespan}
                    className="mt-1 block w-full text-gray-900 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  />
                  {formik.touched.average_lifespan && formik.errors.average_lifespan ? (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.average_lifespan}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="eye_colors" className="block text-sm font-medium text-gray-700">Color de Ojos</label>
                  <input
                    id="eye_colors"
                    name="eye_colors"
                    type="text"
                    disabled={isReadOnly}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.eye_colors}
                    className="mt-1 block w-full text-gray-900 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  />
                  {formik.touched.eye_colors && formik.errors.eye_colors ? (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.eye_colors}</div>
                  ) : null}
                </div>
                 <div>
                  <label htmlFor="hair_colors" className="block text-sm font-medium text-gray-700">Color de Cabello</label>
                  <input
                    id="hair_colors"
                    name="hair_colors"
                    type="text"
                    disabled={isReadOnly}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.hair_colors}
                    className="mt-1 block w-full text-gray-900 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  />
                  {formik.touched.hair_colors && formik.errors.hair_colors ? (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.hair_colors}</div>
                  ) : null}
                </div>
                 <div>
                  <label htmlFor="eye_colors" className="block text-sm font-medium text-gray-700">Color de Piel</label>
                  <input
                    id="skin_colors"
                    name="skin_colors"
                    type="text"
                    disabled={isReadOnly}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.skin_colors}
                    className="mt-1 block w-full text-gray-900 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  />
                  {formik.touched.skin_colors && formik.errors.skin_colors ? (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.skin_colors}</div>
                  ) : null}
                </div>
                 <div>
                  <label htmlFor="language" className="block text-sm font-medium text-gray-700">Idioma</label>
                  <input
                    id="language"
                    name="language"
                    type="text"
                    disabled={isReadOnly}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.language}
                    className="mt-1 block w-full text-gray-900 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  />
                  {formik.touched.language && formik.errors.language ? (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.language}</div>
                  ) : null}
                </div>
                   <div>
                  <label htmlFor="planets" className="font-medium text-gray-700">Planeta</label>
                  <select 
                  name="planet" 
                  id="planet"
                  disabled={isReadOnly}
                  value={formik.values.homeworld._id}
                  onChange={(e)=>{
                    formik.setFieldValue('homeworld', e.target.value)
                  }}
                  className="w-full px-3 py-2 max-h-[100px] text-gray-900 border rounded-md focus:ring-blue-500 focus:online-none bg-white"
                  >
                  {!planets ? (
                    <option>Cargando Opciones</option>
                  ): (
                    planets.map(opt=>(
                      <option key={opt._id} value={opt._id}>{opt.name}</option>
                    ))
                  )}
                    
                  </select>
                </div>
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
                </div>
                ):(<div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={onClose}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                  >
                    Cerrar
                  </button> </div>)}
                
              </form>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md transform transition-all ease-in-out duration-500 sm:duration-700">
          <div className="h-full flex flex-col bg-white shadow-xl overflow-y-auto">
            
            {/* Modal Header */}
            <div className="px-4 py-6 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
               
                {isEditing? (<h2 className="text-lg font-medium text-gray-900">Editar Especie</h2>):(<h2 className="text-lg font-medium text-gray-900">Registrar Nueva Especie</h2>)}
              <button 
                onClick={onClose}
                className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
              >
              </button>
            </div>

            <div className="mt-6 relative flex-1 px-4 sm:px-6">
              
            </div>
            
          </div>
        </div>
      </div>
             </div> 
        </>
    )
}