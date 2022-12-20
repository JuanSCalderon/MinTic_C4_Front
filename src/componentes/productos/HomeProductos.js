import React, { useEffect, useState } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { Link, useNavigate, useParams } from 'react-router-dom';
import crud from "../../conexiones/crud";
import ViewProductos from "./ViewProductos";
import { data } from "autoprefixer";

const HomeProductos = () => {

  const navigate = useNavigate();

  const { idCategoria } = useParams();

  const [productos, setProductos] = useState([]);

  const cargarProductos = async () => {
    const response = await crud.GET(`/api/productos/${idCategoria}`);
    setProductos(response);
  };
  console.log(productos);
  useEffect(() => {
    cargarProductos();
  }, []);


  return (
    <>
      <Header />
      <div className="md:flex md:min-h-screen bg-slate-100">
        <Sidebar />
        <main className="flex-1">
          <div className="mt-10 flex justify-center">
            <h1 className="inline bg-gradient-to-r from-yellow-800 via-yellow-800 to-yellow-400 bg-clip-text font-display text-5xl text-transparent ">
              Products of Category ID: {idCategoria}
            </h1>
          </div>
          <div className="p-10">
            <Link
              to={`/crear-producto/${idCategoria}`}
              className="bg-yellow-500 w-full p-3 text-black uppercase font-bold mt-5 text-center rounded-3xl hover:bg-yellow-300"
            >
              Create Product
            </Link>
          </div>
          <div className="bg-slate-200 shadow mt-10 rounded-3xl  " >
            {productos.map(producto =>
              <ViewProductos
                key={producto._id}
                producto={producto}

              />

            )};

          </div>



        </main>


      </div>


    </>
  );
}

export default HomeProductos;