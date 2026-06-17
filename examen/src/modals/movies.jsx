import react, { useEffect } from "react"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Divider } from "@mui/material";

export default function MoviesModal({isOpen, onClose, data, mode, onSave}){
    const isReadOnly = mode ==="viewing";
    const isEditing = mode === "editing";
    console.log(isEditing)
    const validationSchema=Yup.object({
        title: Yup.string()
        .required('El título es obligatorio'),
        director: Yup.string()
        .required('El director es obligatorio'),
        producer: Yup.string()
        .required('El productor es obligatorio')
    });

    const formik = useFormik({
        initialValues:{
            _id: data?._id||'',
            title: data?.title||'',
            director: data?.director || '',
            producer: data?.producer||''
        }, validationSchema: validationSchema,
        enableReinitialize:true,
        onSubmit: async(values, {setSubmitting, resetForm}) =>{
            try{
              const payload={...values}
              if(!payload._id){
                delete payload._id
              }
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
             <div className="fixed inset-0 z-50 overflow-hidden">
                <div className="absolute inset-0 bg-black/50 transition-opacity" onClick={onClose}></div>
                <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md transform transition-all ease-in-out duration-500 sm:duration-700">
          <div className="h-full flex flex-col bg-white shadow-xl overflow-y-auto">
            
            {/* Modal Header */}
            <div className="px-4 py-6 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                {isEditing?(<h2 className="text-lg font-medium text-gray-900">Editar Película</h2>):(<h2 className="text-lg font-medium text-gray-900">Registrar Nueva Película</h2>)}
              <button 
                onClick={onClose}
                className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
              >
              </button>
            </div>

            <div className="mt-6 relative flex-1 px-4 sm:px-6">
              <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">Nombre</label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    disabled={isReadOnly}
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
                    disabled={isReadOnly}
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
                    disabled={isReadOnly}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.producer}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  />
                  {formik.touched.producer && formik.errors.producer ? (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.producer}</div>
                  ) : null}
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
        </div>
      </div>
             </div> 
        </>
        
    )
}