import { useState, useEffect } from "react";
import { CircleAlert } from 'lucide-react';
export default function ConfirmModal({isOpen, onClose, onDelete, title, message}){
    return(
    <>
    {isOpen&&(
            <>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/50 backdrop-blur-xs transition opacity"
              onClick={onClose}>
                <div className="w-full max-w-sm bg-gray-100 border-slate-100 
                rounded-2xl shadow-2xl relative z-10 text-slate-100 
                transform transition-all p-6 animate-in fade-in 
                zoom-in-95 duration-200 ml-[42%] mt-[15%]">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                      <CircleAlert size={24}/>
                    </div>
                    <h2 className="text-lg font-bold text-gray-900">{title}</h2>
                    <p className="text-sm text-gray-900 leading-relaxed ">
                      Esta acción no se puede deshacer. El registro será eliminado de la base de datos.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-gray-800">
                    <button type="button"
                      onClick={onClose}
                      className="w-full sm:flex-1 bg-white border
                      border-gray-300
                      px-4 py-2.5 rounded-md text-sm font-medium
                      shadow-sm hover:bg-gray-200 text-gray-700 
                      transition-colors cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button type="button"
                    onClick={onDelete}
                    className="w-full sm:flex-1 bg-slate-950 hover:bg-slate-800 border
                    border-slate-800 text-gray-400 hover:text-white
                    px-4 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer"
                    >
                      Eliminar 
                    </button>
                  </div>
                </div>
              </div>
            </div>
            </>
    )}
    </>)
}