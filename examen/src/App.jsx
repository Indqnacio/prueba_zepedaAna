import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import TablaPersonajes from './tablaPersonajes'
import MainPage from './mainPage'
import Sidebar from './sidebarPage'
import MoviesPage from './moviesPage'
import PlanetsPage from './planetsPage'
import SpeciesPage from './speciesPage'
import StarshipsPage from './starshipsPage'
import VehiclesPage from './vehiclesPage'
import CharactersPage from './characters'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage/>}/>
      <Route path="/characters" element={<CharactersPage/>}/>
      <Route path="/starships" element={<StarshipsPage/>}/>
      <Route path="/species" element={<SpeciesPage/>}/>
      <Route path="/vehicles" element={<VehiclesPage/>}/>
      <Route path="/movies" element={<MoviesPage/>}/>
      <Route path="/planets" element={<PlanetsPage/>}/>
    </Routes>
      
      
    </BrowserRouter>
    
    </>
  )
}

export default App
