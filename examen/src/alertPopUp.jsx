import { useState, useEffect } from "react";
import { CircleCheck,CircleAlert, CircleX} from 'lucide-react';
export default function AlertPopUp({isOpen, onClose, type, message}){
    useEffect(()=>{
        if(isOpen){
            const timer = setTimeout(()=>{
                onClose();
            },4000);
            return()=>clearTimeout(timer);
        }
    }, [isOpen])

    if(!isOpen) return null;
    
    const isSuccess = type === "isSuccess"
    return(
        <>
        <div className="fixed top-5 right-5 z-50 max-w-sm
        w-full animate-in slide-in-from-top-5
        ms:slide-in-from-right-5 duration-300">
            <div className={`
                p-4 rounded-2xl shadow-2xl border flex
                items-start gap-3 relative overflow-hidden
                ${isSuccess ? "bg-emerald-950/90 border-emerald-500/30 text-emerald-200"
                    : "bg-rose-950/90 border-rose-500/30 text-rose-200"
                }
            `}>
                {isSuccess ? (<CircleCheck size={24}/>) : (<CircleAlert size={24}/>)}
            
            <div className="flex-1 pr-4">
                <h4 className="font-bold text-sm text-slate-100">
                    {isSuccess?"Operación Exitosa":"Ocurrió un Error"}
                </h4>
                <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                    {message}
                </p>
            </div>
            <button onClick={onClose}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
                <CircleX/>
            </button>
            </div>          
        </div>
        </>
    )
}