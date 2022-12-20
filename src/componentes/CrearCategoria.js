<<<<<<< HEAD
import React, { useState } from "react";
=======
import React,{ useState } from "react"; //importamos archivos
>>>>>>> cda37b8f985cbc80147ef65d6cd96cd02eb9b4df
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useNavigate } from 'react-router-dom';
import crud from '../conexiones/crud';
import swal from 'sweetalert';

const CrearCategoria = () => {

  const navigate = useNavigate();

  const [categoria, setCategoria] = useState({
    nombre: '',
    imagen: ''
  });

  const { nombre, imagen } = categoria;


  const onChange = (e) => {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value
    })
  };

  const ingresarCategoria = async () => {
    const data = {
      nombre: categoria.nombre,
      imagen: categoria.imagen
    }
    //console.log(data);
    const response = await crud.POST(`/api/categorias`, data);
    const mensaje = response.msg;
    const mensaje1 = "la categoria se creo correctamente";
    swal({
      title: 'Información',
      text: mensaje1,
      icon: 'success',
      buttons: {
        confirm: {
          text: 'OK',
          value: true,
          visible: true,
          className: 'btn btn-primary',
          closeModal: true
        }
      }
    });
    //redireccionar nuevamente a la pagina de login
    navigate("/admin");

  };

  const onSubmit = (e) => {
    e.preventDefault();
    ingresarCategoria();
  }


  return (
    <>
      <Header />
      <div className="md:flex md:min-h-screen">
        <Sidebar />
        <main className="flex-1 bg-gray-100">
          <div className="mt-10 flex justify-center">
            <h1 className="inline bg-gradient-to-r from-yellow-600 to-yellow-500 bg-clip-text font-display text-4xl text-transparent ">
              Create Category
            </h1>
          </div>

          <div className="mt-10 flex justify-center">
            <form
              onSubmit={onSubmit}
              className="my-10 bg-white shadow rounded-lg p-10"
            >
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-lx font-bold">Category Name</label>
                <input
                  type="nombre"
                  id="nombre"
                  name="nombre"
                  placeholder="Name"
                  className="w-full mt-3 p-3 border rounded-3xl bg-gray-50"
                  value={nombre}
                  onChange={onChange}
                />

                <label className="uppercase text-gray-600 block text-lx font-bold">Category Image</label>
                <input
                  type="text"
                  id="imagen"
                  name="imagen"
                  placeholder="Image"
                  className="w-full mt-3 p-3 border rounded-3xl bg-gray-50"
                  value={imagen}
                  onChange={onChange}
                />


              </div>
              <input
                type="submit"
                value="Crear Categoria"
                className="bg-yellow-400 mb-5 w-full py-3 text-black uppercase font-bold rounded-3xl hover:cursor-pointer hover:bg-yellow-300 transition-colors"
              />

            </form>
          </div>

        </main>


      </div>


    </>
  );
}

export default CrearCategoria;