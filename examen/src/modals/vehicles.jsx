import { useState, useEffect } from "react"
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from 'yup';

export default function VehiclesModal({isOpen, onClose, data, mode, onSave}){
    const isReadOnly = mode ==="viewing";
    const isEditing = mode === "editing";
    const validationSchema=Yup.object({
            name: Yup.string()
            .required('El título es obligatorio'),
            model: Yup.string()
            .required('El director es obligatorio'),
            vehicle_class: Yup.string(),
            length: Yup.string(),
            passengers: Yup.string(),
            max_atmosphering_speed: Yup.string(),
            cargo_capacity: Yup.string(),
            consumables: Yup.string()
        });
    
    const formik = useFormik({
        initialValues:{
          _id: data?._id||'',
            name: data?.name||'',
            model: data?.model || '',
            vehicle_class: data?.vehicle_class||'',
            length: data?.length||'',
            passengers: data?.passengers||'',
            max_atmosphering_speed: data?.max_atmosphering_speed||'',
            cargo_capacity: data?.cargo_capacity||'',
            consumables: data?.consumables||''
        }, validationSchema: validationSchema,
        enableReinitialize:true,
        onSubmit: async(values, {setSubmitting, resetForm}) =>{
            try{
              await onSave(values)
/*                console.log(values)
                const response = await axios.post('http://localhost:3000/postVehiculo', values);
                console.log("Form mandado exitosamente ", response.data);
                alert('Data enviado')*/
                resetForm();
                onClose();
            }catch(error){
                console.error("Error mandando los datos: ", error)
                alert('fallo al submit ', error);
            }finally{
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
                {isEditing?(<h2 className="text-lg font-medium text-gray-900">Editar Vehículo</h2>):(<h2 className="text-lg font-medium text-gray-900">Agregar Vehículo</h2>)}
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
                  <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model</label>
                  <input
                    id="model"
                    name="model"
                    type="text"
                    disabled={isReadOnly}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.model}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  />
                  {formik.touched.model && formik.errors.model ? (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.model}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="vehicle_class" className="block text-sm font-medium text-gray-700">Clase</label>
                  <input
                    id="vehicle_class"
                    name="vehicle_class"
                    type="text"
                    disabled={isReadOnly}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.vehicle_class}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  />
                  {formik.touched.vehicle_class && formik.errors.vehicle_class ? (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.vehicle_class}</div>
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  />
                  {formik.touched.passengers && formik.errors.passengers ? (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.passengers}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="max_atmosphering_speed" className="block text-sm font-medium text-gray-700">Máx. Velocidad Atmosférica</label>
                  <input
                    id="max_atmosphering_speed"
                    name="max_atmosphering_speed"
                    type="number"
                    disabled={isReadOnly}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.max_atmosphering_speed}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  />
                  {formik.touched.max_atmosphering_speed && formik.errors.max_atmosphering_speed ? (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.max_atmosphering_speed}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="cargo_capacity" className="block text-sm font-medium text-gray-700">Capacidad de Carga</label>
                  <input
                    id="cargo_capacity"
                    name="cargo_capacity"
                    type="number"
                    disabled={isReadOnly}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.cargo_capacity}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
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
                    disabled={isReadOnly}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.consumables}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  />
                  {formik.touched.consumables && formik.errors.consumables ? (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.consumables}</div>
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
                ):(
                   <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={onClose}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                  >
                    Cancelar
                  </button></div>
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