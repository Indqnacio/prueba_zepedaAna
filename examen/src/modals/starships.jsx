import {useState, useEffect} from "react"
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { CircleX } from "lucide-react";
export default function StarshipsModal({isOpen, onClose, data, mode, onSave}){
  const isReadOnly = mode ==="viewing";
  const isEditing = mode === "editing";  
  const validationSchema=Yup.object({
            name: Yup.string()
            .required('El nombre es obligatorio'),
            model: Yup.string()
            .required('El modelo es obligatorio'),
            starship_class: Yup.string(),
            length: Yup.string(),
            passengers: Yup.string(),
            max_atmosphering_speed: Yup.string(),
            hyperdrive_rating: Yup.string(),
            MGLT: Yup.string(),
            cargo_capacity: Yup.string(),
            consumables: Yup.string()
        });
    
    const formik = useFormik({
        initialValues:{
            _id: data?._id||'',
            name: data?.name||'',
            model: data?.model || '',
            starship_class: data?.starship_class||'',
            length: data?.length||'',
            passengers: data?.passengers||'',
            max_atmosphering_speed: data?.max_atmosphering_speed||'',
            hyperdrive_rating: data?.hyperdrive_rating||'',
            MGLT: data?.MGLT||'',
            cargo_capacity: data?.cargo_capacity||'',
            consumables: data?.consumables||''
        }, validationSchema: validationSchema,
        enableReinitialize:true,
        onSubmit: async(values, {setSubmitting, resetForm}) =>{
            try{ const payload={...values}
              if(!payload._id){
                delete payload._id
                console.log("se elimino")
              }
              await onSave(payload)
/*                console.log(values)
                const response = await axios.post('http://localhost:3000/postNave', values);
                console.log("Form mandado exitosamente ", response.data);
                alert('Data enviado')*/
                resetForm();
                onClose();
            }catch(error){
                console.error("Error mandando los datos: ", error)
                alert('Fallo al guardar cambios ', error);
            }finally{
              setSubmitting(false)
            }
        }
    });
    if(!isOpen) return null;
    return(
        <>
             <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-end">
                <div className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-500" onClick={onClose}></div>
                <div className="w-full max-w-lg h-full bg-gray-100 border-1 border-gray-50 round round-xl shadow-2xl relative z-10 text-slate-100 flex flex-col">
                   <div className="px-6 py-5 bg-gray-100 flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-900">{isEditing?"Editar Nave":"Agregar Nave"}</h2>
                     <button 
                      onClick={onClose}
                      className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                      ><CircleX/>
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
                    className="mt-1 block w-full text-gray-900 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.name}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="model" className="block text-sm font-medium text-gray-700">Modelo</label>
                  <input
                    id="model"
                    name="model"
                    type="text"
                    disabled={isReadOnly}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.model}
                    className="mt-1 block w-full text-gray-900 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  />
                  {formik.touched.model && formik.errors.model ? (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.model}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="starship_class" className="block text-sm font-medium text-gray-700">Clase</label>
                  <input
                    id="starship_class"
                    name="starship_class"
                    type="text"
                    disabled={isReadOnly}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.starship_class}
                    className="mt-1 block w-full text-gray-900 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  />
                  {formik.touched.starship_class && formik.errors.starship_class ? (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.starship_class}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="length" className="block text-sm font-medium text-gray-700">Tamaño</label>
                  <input
                    id="length"
                    name="length"
                    type="number"
                    disabled={isReadOnly}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.length}
                    className="mt-1 block w-full text-gray-900 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  />
                  {formik.touched.length && formik.errors.length ? (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.length}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="passengers" className="block text-sm font-medium text-gray-700">Pasajeros</label>
                  <input
                    id="passengers"
                    name="passengers"
                    type="number"
                    disabled={isReadOnly}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.passengers}
                    className="mt-1 block w-full text-gray-900 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  />
                  {formik.touched.passengers && formik.errors.passengers ? (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.passengers}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="max_atmosphering_speed" className="block text-sm font-medium text-gray-700">Máxima Valovidad Atmosférica</label>
                  <input
                    id="max_atmosphering_speed"
                    name="max_atmosphering_speed"
                    type="number"
                    disabled={isReadOnly}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.max_atmosphering_speed}
                    className="mt-1 block w-full text-gray-900 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  />
                  {formik.touched.max_atmosphering_speed && formik.errors.max_atmosphering_speed ? (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.max_atmosphering_speed}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="hyperdrive_rating" className="block text-sm font-medium text-gray-700">Hyperturbo</label>
                  <input
                    id="hyperdrive_rating"
                    name="hyperdrive_rating"
                    type="number"
                    disabled={isReadOnly}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.hyperdrive_rating}
                    className="mt-1 block w-full text-gray-900 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  />
                  {formik.touched.hyperdrive_rating && formik.errors.hyperdrive_rating ? (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.hyperdrive_rating}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="MGLT" className="block text-sm font-medium text-gray-700">MGLT</label>
                  <input
                    id="MGLT"
                    name="MGLT"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={isReadOnly}
                    value={formik.values.MGLT}
                    className="mt-1 block w-full text-gray-900 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  />
                  {formik.touched.MGLT && formik.errors.MGLT ? (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.MGLT}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="cargo_capacity" className="block text-sm font-medium text-gray-700">Capacidad de Carga</label>
                  <input
                    id="cargo_capacity"
                    name="cargo_capacity"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={isReadOnly}
                    value={formik.values.cargo_capacity}
                    className="mt-1 block w-full text-gray-900 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  />
                  {formik.touched.cargo_capacity && formik.errors.cargo_capacity ? (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.cargo_capacity}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="consumables" className="block text-sm font-medium text-gray-700">Consumibles</label>
                  <input
                    id="consumables"
                    name="consumables"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={isReadOnly}
                    value={formik.values.consumables}
                    className="mt-1 text-gray-900 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  />
                  {formik.touched.consumables && formik.errors.consumables ? (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.consumables}</div>
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
                ):(
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
        </>
    )
}