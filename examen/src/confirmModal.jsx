import { useState, useEffect } from "react";
export default function ConfirmModal({isOpen, onClose, onDelete, title, message}){
    return(
    <>
    {isOpen&&(
          <div className="fixed inset-0 z-50 overflow-hidden">
                <div className="absolute inset-0 bg-black/50 transition-opacity" onClick={onClose}></div>
                <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md transform transition-all ease-in-out duration-500 sm:duration-700">
          <div className="h-full flex flex-col bg-white shadow-xl overflow-y-auto">

            <div className="px-4 py-6 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Eliminar Registro</h2>
              <button 
                onClick={onClose}
                className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
              >
              </button>
            </div>

            <div className="mt-6 relative flex-1 px-4 sm:px-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">{message}</label>
                  <button 
                onClick={onDelete}
                className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
              >Eliminar Registro
              </button>
                </div>
            </div>
            
          </div>
        </div>
      </div>
             </div> 
    )}
    </>)
}