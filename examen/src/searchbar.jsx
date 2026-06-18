import {useState, useEffect} from "react";
export default function Searchbar({searchQuery, onSearchChange}){
    return (
        <>
            <div style={{marginBottom: '20px'}}>
                <input type="text" placeholder="Buscar" value={searchQuery} onChange={(e)=> onSearchChange(e.target.value)}
                style={{padding:'8px', width:'300px', fontSize:'16px'}}>
                </input>
            </div>
        </>
    )
}
