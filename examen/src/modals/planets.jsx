import {useState, useEffect} from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { CircleX } from "lucide-react";
export default function PlanetsModal({isOpen, onClose, data, mode, onSave}){
  const isReadOnly = mode ==="viewing";
  const isEditing = mode === "editing"; 
  console.log(data) 
  const validationSchema = Yup.object({
        name: Yup.string()
        .required('El nombre del planeta es obligatorio'),
        diameter: Yup.string(),
        rotation_period: Yup.string(),
        orbital_period: Yup.string(),
        gravity: Yup.string(),
        population: Yup.string(),
        climate: Yup.string(),
        surface_water: Yup.string(),
    })
    const formik = useFormik({
        initialValues:{
          _id:data?._id||'',
            name: data?.name||'',
            diameter: data?.diameter||'',
            rotation_period: data?.rotation_period||'',
            orbital_period: data?.orbital_period||'',
            gravity: data?.gravity||'',
            population: data?.population||'',
            climate: data?.climate||'',
            surface_water: data?.surface_water||'',
            terrain: data?.terrain||''
        }, validationSchema: validationSchema,
        enableReinitialize:true,
        onSubmit: async(values, {setSubmitting, resetForm}) =>{
            try{
              const payload={...values}
              if(!payload._id){
                delete payload._id
                console.log("se elimino")
              }
              await onSave(payload)
              resetForm();
              onClose();
/*                const response = await axios.post('http://localhost:3000/postPlaneta', values);
                alert('Data enviado')
                resetForm();
                onClose();*/
            }catch(error){
                console.error("Error mandando los datos: ", error.message)
                alert('Fallo al guardar los datos ', error.message);
            } finally{
              setSubmitting(false)
            }
        }
    });
    useEffect(()=>{
        console.log("MODE ", mode)
    },[mode])
    if(!isOpen) return null;
    return(
        <>
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-end">
            <div className="absolute inset-0 backdrop-blur-xs transition-opacity duration-500" onClick={onClose}></div>
            <div className="w-full max-w-lg h-full bg-gray-100 round round-xl shadow-2xl relative z-10 text-slate-100 flex flex-col">
        <div className="px-6 py-5 bg-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">{isEditing?"Editar Planeta":"Agregar Planeta"}</h2>
                <button onClick={onClose} className="text-slate-400 hover:text-black transition-colors cursor-pointer">
                  <CircleX/>
                </button>
          
        </div>
        <div className="mt-6 flex-1 overflow-y-auto ">
              <form onSubmit={formik.handleSubmit} className="space-y-6 px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
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
                    <div className="space-y-4">
                  <label htmlFor="diameter" className="block text-sm font-medium text-gray-700">Diámetro</label>
                  <input
                    id="diameter"
                    name="diameter"
                    type="number"
                    disabled={isReadOnly}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.diameter}
                    className="mt-1 block w-full rounded-md text-gray-900 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  />
                  {formik.touched.diameter && formik.errors.diameter ? (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.diameter}</div>
                  ) : null}
                </div>
                <div className="space-y-4">
                  <label htmlFor="rotation_period" className="block text-sm font-medium text-gray-700">Período de Rotación</label>
                  <input
                    id="rotation_period"
                    name="rotation_period"
                    type="number"
                    disabled={isReadOnly}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.rotation_period}
                    className="mt-1 block w-full rounded-md text-gray-900 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  />
                  {formik.touched.rotation_period && formik.errors.rotation_period ? (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.rotation_period}</div>
                  ) : null}
                </div>
                <div className="space-y-4">
                  <label htmlFor="orbital_period" className="block text-sm font-medium text-gray-700">Período de órbita</label>
                  <input
                    id="orbital_period"
                    name="orbital_period"
                    type="number"
                    disabled={isReadOnly}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.orbital_period}
                    className="mt-1 block w-full rounded-md text-gray-900 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  />
                  {formik.touched.orbital_period && formik.errors.orbital_period ? (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.orbital_period}</div>
                  ) : null}
                </div>
                <div className="space-y-4">
                  <label htmlFor="gravity" className="block text-sm font-medium text-gray-700">Gravedad</label>
                  <input
                    id="gravity"
                    name="gravity"
                    type="text"
                    disabled={isReadOnly}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.gravity}
                    className="mt-1 block w-full rounded-md text-gray-900 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  />
                  {formik.touched.gravity && formik.errors.gravity ? (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.gravity}</div>
                  ) : null}
                </div>
                <div className="space-y-4">
                  <label htmlFor="population" className="block text-sm font-medium text-gray-700">Población</label>
                  <input
                    id="population"
                    name="population"
                    type="number"
                    disabled={isReadOnly}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.population}
                    className="mt-1 block w-full rounded-md text-gray-900 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  />
                  {formik.touched.population && formik.errors.population ? (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.population}</div>
                  ) : null}
                </div>
                <div className="space-y-4">
                  <label htmlFor="climate" className="block text-sm font-medium text-gray-700">Clima</label>
                  <input
                    id="climate"
                    name="climate"
                    type="text"
                    disabled={isReadOnly}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.climate}
                    className="mt-1 block w-full rounded-md text-gray-900 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  />
                  {formik.touched.climate && formik.errors.climate ? (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.climate}</div>
                  ) : null}
                </div>
                 <div className="space-y-4">
                  <label htmlFor="terrain" className="block text-sm font-medium text-gray-700">Terreno</label>
                  <input
                    id="terrain"
                    name="terrain"
                    type="text"
                    disabled={isReadOnly}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.terrain}
                    className="mt-1 block w-full rounded-md text-gray-900 max-w-[300px] border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  />
                  {formik.touched.terrain && formik.errors.terrain ? (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.terrain}</div>
                  ) : null}
                </div>
                   <div className="space-y">
                  <label htmlFor="surface_water" className="block text-sm font-medium text-gray-700">Superficie de Agua</label>
                  <input
                    id="surface_water"
                    name="surface_water"
                    type="number"
                    disabled={isReadOnly}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.surface_water}
                    className="mt-1 block w-full rounded-md text-gray-900 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  />
                  {formik.touched.surface_water && formik.errors.surface_water ? (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.surface_water}</div>
                  ) : null}
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
                  </button></div>

                  )}
              </form>
            </div>
      </div>
             </div> 
        </>
    )
}