import './App.css'
import {Route, Routes} from 'react-router-dom'
import Home from './Pages/Home'
import { Navbar } from './Components/Navbar'
import Explore from './Pages/Explore'
import AddProduct from './Pages/AddProduct'

function App() {


  return (
    <>
    <Navbar/>
      <Routes>
        <Route path = '/' element = {<Home/>}/>
        <Route path = '/explore' element = {<Explore/>}/>
        <Route path = '/new-product' element = {<AddProduct/>}/>
      </Routes>
    </>
  )
}

export default App
