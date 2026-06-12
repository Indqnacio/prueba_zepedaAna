import react from "react"
import ListItemIcon from '@mui/material/ListItemIcon';
import { useEffect, useState } from "react";
export default function Sidebar({open}){
   // const [open, setOpen] = useState(false);
    const elements=['Personajes','Películas', 'Especies', 'Naves','Vehículos','Planetas']
    
    return(
        
        <div>
            <ul>
                {elements.forEach(element=>{
                    (<li>
                        {element}
                    </li>)
                })}
            </ul>
        </div>
    )
}