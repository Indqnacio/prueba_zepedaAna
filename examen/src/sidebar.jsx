import react from "react"
import ListItemIcon from '@mui/material/ListItemIcon';
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

export default function Sidebar({activePage, setActivePage}){
    const [isCollapsed, setIsCollapsed] = useState(true);
    //const [activePage, setActivePage] = useState("");
    const elements=[{id:'characters', label:'Personajes', href:'/'},
        {id:'movies', label:'Películas', href:'/movies'},
        {id:'planets', label:'Planetas', href:'/planets'},
        {id:'vehicles', label:'Vehículos', href:'/vehicles'},
        {id:'starships', label:'Naves', href:'/starships'},
        {id:'species', label:'Especies', href:'/species'}]
    
    return(
        <>
        
        <aside className={`h-screen bg-indigo-100 flex flex-col justify-between 
        p-4 transition-all duration-300 ease-in-out select-nonde 
        ${isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"}`}>
            <div>
                <div className="flex items-center justify-between mb-8 min-h-[40px] relative">
                    <span className={`font-bold text-xl blue-500 
                        bg-clip-text transition-all duration-300 overflow-hidden whitespace-nowrap 
                        ${isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"}`}>
                            Gestor de Starwars
                    </span>
                    <Button onClick={()=> setIsCollapsed(!isCollapsed)} className="p-2 rounded-lg bg-indigo-950 hover:bg-slate-700 text-slate-300 white-transition-colors">{isCollapsed ? "p" : "q"}</Button>
                </div>
                        <nav className="space-y-2">
                    {elements.map((item)=>{
                        const isActive = activePage === item.id
                        return(
                            <buton key={item.id} type="button" onClick={()=> setActivePage(item.id)} className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group relative cursor-pointer
                                ${isActive ? "bg-blue-600/20 text-blue-400 font-semibold border-1-4 border-blue-500 rounded-1-none pl-2" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}>
                                    <span className={`whitespace-nowrap transition-all duration-300 overflowhidden text-left ${isCollapsed ? "w-0 opacity-0 pointer-events-none" : "w-auto opacity-100"}`}>
                                        {item.label}
                                    </span>
                                    {isCollapsed && (
                                        <div className="absolute left-full rounded-md px-2 py-1 ml-4 bg-blue-600 text-white text-xs font-semiboldopacity-0 -translate-x-2 group-hover:opacity">
                                            {item.label}
                                        </div>
                                    )}
                                </buton>
                        );
                    })}
        </nav>
            </div>
        </aside>

        </>
        
    )
}