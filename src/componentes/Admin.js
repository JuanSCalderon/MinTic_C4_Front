import React, { useEffect, useState } from "react";//agregar funcion de useEffect, useState 
import { useNavigate } from 'react-router-dom';
import crud from "../conexiones/crud";
import Header from "./Header";
import Sidebar from "./Sidebar";
import swal from 'sweetalert';

const Admin = () => {
  
  const navigate = useNavigate();

  useEffect(() =>{
    const autenticarUsuario = async () =>{
      const token = localStorage.getItem('token')
      //console.log(token)
      if(!token){
        navigate("/login");
      }

    }
    autenticarUsuario()
  },[navigate]);//[] se ejecuta solo una vez
  
  
  const [categoria, setCategoria] = useState([]);
  
  const cargarCategorias = async () => {
    const response = await crud.GET(`/api/categorias`);
    console.log(response);
    setCategoria(response.categoria);
  }

  useEffect(() => {
    cargarCategorias();
  },[]);


  const borrarCategoria = async (e, idCategoria) => {
    swal({
      title: "Estas seguro de eliminar esta categoria?",
      text: "Una vez eliminado, no podra recuperar esta categoria",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        e.preventDefault();
        const response = crud.DELETE(`/api/categorias/${idCategoria}`);
        //console.log(response.msg);
        const mensaje = response.msg;
        if(response){
          swal("Tu categoria a sido eliminada correctamente", {
            icon: "success",
          });
        }
        cargarCategorias();
      } else {
        swal("se cancelo la acción");
      }
    });
   
  }


  const actualizarCategoria = async ( idCategoria) =>{
    
    navigate(`/actualizar-categoria/${idCategoria}`)

  }  

  const crearProductos = async (idCategoria) =>{
    navigate(`/home-productos/${idCategoria}`);
  }

  return (
    <>
      <Header/>
<div className="md:flex md:min-h-screen">
        <Sidebar/>
  <main className="flex-1">
        <h1 className="inline bg-gradient-to-r from-indigo-200 via-violet-700 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
          lista de categorias
        </h1>
    <div>
      <table>
        <thead className="bg-white">
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>ID</th>
            <th>Opciónes</th>
          </tr>
        </thead>

        <tbody className="bg-white">
          {
            categoria.map(
              item => 
              <tr key={item._id}>
                <td><img src={item.imagen} width="150" height="150"></img></td>
                <td>{item.nombre}</td>
                <td>{item._id}</td>
                <td>
                <input 
                type="submit"
                value="Eliminar"
                className="bg-violet-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-violet-300 transition-colors"
               onClick={(e) => borrarCategoria(e, item._id)}
            />
             <input 
                type="submit"
                value="Actualizar"
                className="bg-violet-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-violet-300 transition-colors"
                onClick={(e) => actualizarCategoria(item._id)}
            />
             <input 
                type="submit"
                value="Crear Producto"
                className="bg-violet-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-violet-300 transition-colors"
                onClick={(e) => crearProductos(item._id)}
            />
                </td>
              </tr>
            )
          }

        </tbody>

      </table>
    </div>
  </main>
</div>
    </>
    );
}

export default Admin;