import React, { useEffect, useState } from "react";//agregar funcion de useEffect, useState 
import { useNavigate } from 'react-router-dom';
import crud from "../conexiones/crud";
import Header from "./Header";
import Sidebar from "./Sidebar";
import swal from 'sweetalert';

const Admin = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem('token')
      //console.log(token)
      if (!token) {
        navigate("/login");
      }

    }
    autenticarUsuario()
  }, [navigate]);//[] se ejecuta solo una vez


  const [categoria, setCategoria] = useState([]);

  const cargarCategorias = async () => {
    const response = await crud.GET(`/api/categorias`);
    console.log(response);
    setCategoria(response.categoria);
  }

  useEffect(() => {
    cargarCategorias();
  }, []);


  const borrarCategoria = async (e, idCategoria) => {
    swal({
      title: "Estas seguro de eliminar esta categoria?",
      text: "Una vez eliminado, no podrás recuperar esta categoria",
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
          if (response) {
            swal("Tu categoría ha sido eliminada correctamente", {
              icon: "success",
            });
          }
          cargarCategorias();
        } else {
          swal("Se canceló la acción");
        }
      });

  }


  const actualizarCategoria = async (idCategoria) => {

    navigate(`/actualizar-categoria/${idCategoria}`)

  }

  const crearProductos = async (idCategoria) => {
    navigate(`/home-productos/${idCategoria}`);
  }

  return (
    <>
      <Header />
      <div className="bg-slate-100 md:flex md:min-h-screen">
        <Sidebar />
        <main className="flex-1">
          <h1 className="inline bg-gradient-to-r from-yellow-800 via-yellow-800 to-yellow-400 bg-clip-text font-display text-5xl text-transparent ">
            Categories List
          </h1>
          <div>
            <table WIDTH="100%" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", 'borderStyle': 'solid' }}>
              <thead className="bg-white" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", 'borderStyle': 'solid' }}>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>ID</th>
                  <th>Options</th>
                </tr>
              </thead>

              <tbody className="bg-transparent" >
                {
                  categoria.map(
                    item =>
                      <tr key={item._id} style={{ "borderWidth": "2px", 'borderColor': "#aaaaaa", 'borderStyle': 'solid' }}>
                        <td><img src={item.imagen} width="250" height="250"></img></td>
                        <td>{item.nombre} </td>
                        <td>{item._id}</td>
                        <td>
                          <input
                            type="submit"
                            value="Delete"
                            className="bg-yellow-500 mb-5 w-2/5 py-3 text-black uppercase font-bold rounded-3xl hover:cursor-pointer hover:bg-yellow-300 transition-colors"
                            onClick={(e) => borrarCategoria(e, item._id)}

                          />
                          <input
                            type="submit"
                            value="Update"
                            className="bg-yellow-500 mb-5 w-2/5 py-3 text-black uppercase font-bold rounded-3xl hover:cursor-pointer hover:bg-yellow-300 transition-colors"
                            onClick={(e) => actualizarCategoria(item._id)}
                          />
                          <input
                            type="submit"
                            value="Create Product"
                            className="bg-yellow-500 mb-5 w-2/5 py-3 text-black uppercase font-bold rounded-3xl hover:cursor-pointer hover:bg-yellow-300 transition-colors"
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