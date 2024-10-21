import React, { useEffect } from 'react'
import '../../assets/css/TodoLIST.css'
import {useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import {db} from '../../firebase/config'




export const TodoList = () => {
    const {register, handleSubmit,formState: {errors}, reset} = useForm();
    const navigate = useNavigate();

    //obtener los datos con el metodo getDocs
    const getTareas = async () => {
        const getTareas = await getDocs(collection(db,'Tareas'));
        console.log(getTareas.docs);

        const data = getTareas.docs.map((doc) => {console.log({...doc.data(), id: doc.id})})


    }

    const onSubmitForm = async (data) =>{
        try{
            //cada nueva tarea se inicializa como false, y luego el usuario puede cambiar su estado a true
                const NuevaTarea ={
                    ...data,
                    completada : false,
                };

                let respuesta = await addDoc(collection(db, 'Tareas'),data, NuevaTarea);
                console.log(respuesta);

                //Se limpia el formulario despues de cada tarea ingresada por el usuario
                reset();
                //en caso de que la tarea no pueda ser agregada muestra error en consola
        }catch(erorr){
            console.error("No se logro agregar la nueva tarea", erorr);
        }
    }
        //Metodo para redirigir a otra pagina a donde se muestren los datos que ingreso el usuario
    const handelNavigate = () => {
        navigate('/Tareas')
    }

        useEffect (()=>{
                getTareas();
        },[]
    )
    return (
        <>
            <div className='Container'>
                <h1 className='Titulo__principal'>TODO LIST</h1>
                <form className='Modificador__form' onSubmit={handleSubmit(onSubmitForm)}>
                    <label className='Modificar__texto'>Escribir una tarea</label>
                    <input type="text" placeholder='Escribe una tarea' {...register('Tarea', {
                        required:{
                            value: true,
                            message: "El campo de tareas no puede quedar vacio"
                    }})}/>
                    {
                        errors.Tarea && <span className='Errors'>{errors.Tarea.message}</span>
                    }
                    <label className='Modificar__texto'>Descripcion de la tarea</label>
                    <input type="text" placeholder='Descripcion' {...register('Descripcion', {
                        required:{
                            value : true,
                            message: "El campo de descripcion no puede quedar vacio"
                    }})}/>    
                    {
                        errors.Descripcion && <span className='Errors'>{errors.Descripcion.message}</span>
                    }

                    <button type='submit' className='btn-modificador'>Agrega tarea</button>

                    <button className='btn-modificador btn-2__modificador' 
                    onClick={handelNavigate}>Mostrar tareas</button>
                </form>
            </div>
        </> 
    )
}

export default TodoList
