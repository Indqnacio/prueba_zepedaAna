import {useState, useEffect} from "react";
import { Search } from 'lucide-react';
export default function Searchbar({searchQuery, onSearchChange}){
    return (
        <>
            <div className="bg-gray-50 rounded-lg 
            max-w-sm shadow-lg items-center transition-all duration-300 h-10">
                <input className="w-full h-full rounded-xl px-4" type="text" placeholder="Buscar" value={searchQuery} onChange={(e)=> onSearchChange(e.target.value)}
               >
                </input>
            </div>
        </>
    )
}
