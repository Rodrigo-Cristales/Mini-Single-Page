import { useState } from 'react'
import '././assets/css/App.css'
import TodoList from './pages/Todo List/TodoList.'
import MostrarDatos from './pages/Todo List/mostrarDatos/MostrarDatos'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element = {<TodoList/>}/>
      <Route path='Tareas' element = {<MostrarDatos/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
