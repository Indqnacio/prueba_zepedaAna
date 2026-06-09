import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import TablaPersonajes from './tablaPersonajes'
import MainPage from './mainPage'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <MainPage></MainPage>
    </>
  )
}

export default App
