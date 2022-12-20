import React, { useState } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { useNavigate, useParams } from 'react-router-dom';
import crud from '../../conexiones/crud';
import swal from 'sweetalert';

const CrearProductos = () => {

  const navigate = useNavigate();
  const { idCategoria } = useParams();

  const [categoria, setCategoria] = useState({
    nombre: '',
    descripcion: '',
    stock: '',
    precio: '',
    imagen: '',
    categoriaId: ''
  });

  const { nombre, descripcion, stock, precio, imagen } = categoria;


  const onChange = (e) => {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value
    })
  };

  const ingresarCategoria = async () => {
    const data = {
      nombre: categoria.nombre,
      descripcion: categoria.descripcion,
      stock: categoria.stock,
      precio: categoria.precio,
      imagen: categoria.imagen,
      categoriaId: idCategoria
    }
    //console.log(data);
    const response = await crud.POST(`/api/productos`, data);
    const mensaje = response.msg;
    const mensaje1 = "The category wasn't created successfully";
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
    navigate(`/home-productos/${idCategoria}`);

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
        <main className="flex-1 bg-gray-100" >
          <div className="mt-10 flex justify-center">
            <h1 className="inline bg-gradient-to-r from-yellow-600 to-yellow-500 bg-clip-text font-display text-4xl text-transparent">
              Create Products
            </h1>
          </div>

          <div className="mt-10 flex justify-center">
            <form
              onSubmit={onSubmit}
              className="my-10 bg-white shadow rounded-lg p-10"
            >
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-lx font-bold">Nombre</label>
                <input
                  type="nombre"
                  id="nombre"
                  name="nombre"
                  placeholder="Name"
                  className="w-full mt-3 p-3 border rounded-3xl bg-gray-50"
                  value={nombre}
                  onChange={onChange}
                />
                <label className="uppercase text-gray-600 block text-lx font-bold">descripcion</label>
                <input
                  type="text"
                  id="descripcion"
                  name="descripcion"
                  placeholder="Description"
                  className="w-full mt-3 p-3 border rounded-3xl bg-gray-50"
                  value={descripcion}
                  onChange={onChange}
                />
                <label className="uppercase text-gray-600 block text-lx font-bold">stock</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  placeholder="Stock"
                  className="w-full mt-3 p-3 border rounded-3xl bg-gray-50"
                  value={stock}
                  onChange={onChange}
                />
                <label className="uppercase text-gray-600 block text-lx font-bold">precio</label>
                <input
                  type="number"
                  id="precio"
                  name="precio"
                  placeholder="Price"
                  className="w-full mt-3 p-3 border rounded-3xl bg-gray-50"
                  value={precio}
                  onChange={onChange}
                />

                <label className="uppercase text-gray-600 block text-lx font-bold">Imagen</label>
                <input
                  type="text"
                  id="imagen"
                  name="imagen"
                  placeholder="Image Url"
                  className="w-full mt-3 p-3 border rounded-3xl bg-gray-50"
                  value={imagen}
                  onChange={onChange}
                />


              </div>
              <input
                type="submit"
                value="Crear Productos"
                className="bg-yellow-400 mb-5 w-full py-3 text-black uppercase font-bold rounded-3xl hover:cursor-pointer hover:bg-yellow-300 transition-colors"
              />

            </form>
          </div>

        </main>


      </div>


    </>
  );
}

export default CrearProductos;