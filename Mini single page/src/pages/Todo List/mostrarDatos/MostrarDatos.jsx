import React, { useEffect, useState } from 'react'
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { db } from '../../../firebase/config';
import '../../../assets/css/MostrarDatos.css'


const MostrarDatos = () => {

    const [Tareas, setTareas] = useState([]);

    //Metodo para acceder a los registros de la base de datos
    const AccederDatos = async () =>{
        try{
                const Datos = await getDocs(collection(db, 'Tareas'));
                const TareasLIST = Datos.docs.map((doc) => ({
                    ...doc.data(),
                    id : doc.id,
                }));
                setTareas(TareasLIST);
        }catch(error){
            console.error("Error al obtener las tareas : ", error);
        }
    }

    useEffect(() => {
            AccederDatos();
        }, []);



    /*Con este metodo, cambio el estado de la tarea, de si esta realizada o no, 
    y de ese modo se le muestra un mensaje*/

    const EstadoActual = async (tarea) => {
        try {
            const tareaRef = doc(db, 'Tareas', tarea.id);
            await updateDoc(tareaRef, {
            completada: !tarea.completada,
            });
            
                setTareas((prevTareas) => {
                    const updatedTareas = prevTareas.map((t) =>
                        t.id === tarea.id ? { ...t, completada: !t.completada } : t
                    );

             //este console me sirve para determinar si se realizo el cambio de infomarcion o mas bien de estado
                    console.log("Tareas después de la actualización:", updatedTareas); //
                    return updatedTareas
                })
        } catch (error) {
            console.error('Error al actualizar la tarea:', error);
        }
    };

    

return (
    <>
        <h1 className='Titulo__principal'>Tareas registradas</h1>
            {Tareas.length > 0 ?(
                    <table className='Table__Modificador'>
                        <thead>
                            <tr>
                                <th>Tarea</th>
                                <th>Decripcion</th>
                                <th>Completada</th>
                                <th>Pendiente</th>
                            </tr>
                            </thead>  
                            <tbody>
                                {/*Proceso para vincular los datos de la base de datos en una tabla*/}
                                {Tareas.map((tarea) => (
                                    <tr key={tarea.id}>
                                    <td>{tarea.Tarea}</td>
                                    <td>{tarea.Descripcion}</td>
                                    <td>
                                        {/*Atraves de este input el usuario puede cambiar el estado de su tarea*/}
                                        <input type="checkBox" checked = {tarea.completada}
                                        onChange={() => EstadoActual(tarea)}/>
                                    </td>
                                    <td>
                                    {tarea.completada ? (
                                    <span>¡Tarea completada!</span>
                                ) : (
                                    <span>Pendiente</span>
                                )}
                                    </td>
                                    </tr>
                                ))}
                            </tbody>
                    </table>
                    
            ): (
                <p className='Errors'>No hay ninguna tarea</p>
            )        
        }
        <section className='Link__container'>
        <Link to = "/" className='Link__estilo'>Nueva Tarea</Link>
        </section>

    </>
    
  )
}

export default MostrarDatos
