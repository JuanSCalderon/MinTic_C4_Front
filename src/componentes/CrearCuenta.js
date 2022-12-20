import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import crud from '../conexiones/crud';

const CrearCuenta = () => {

  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmar: ''
  });

  const { nombre, email, password, confirmar } = usuario;


  const onChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  };

  const crearCuenta = async () => {
    // los dos password deben ser iguales
    if (password !== confirmar) {
      console.log('diferntes');
      const mensaje = "The passwords doesn't match";
      swal({
        title: 'Error',
        text: mensaje,
        icon: 'error',
        buttons: {
          confirm: {
            text: 'OK',
            value: true,
            visible: true,
            className: 'btn btn-danger',
            closeModal: true
          }
        }
      });

    } else {
      const data = {
        nombre: usuario.nombre,
        email: usuario.email,
        password: usuario.password
      }
      console.log(data);
      const response = await crud.POST(`/api/usuarios`, data);
      const mensaje = response.msg;
      //console.log(mensaje);
      if (mensaje === "El usuario ya existe") {
        const mensaje = "User already exists";
        swal({
          title: 'Error',
          text: mensaje,
          icon: 'error',
          buttons: {
            confirm: {
              text: 'OK',
              value: true,
              visible: true,
              className: 'btn btn-danger',
              closeModal: true
            }
          }
        });
      } else {
        const mensaje = "The User was created succesfully";
        swal({
          title: 'Información',
          text: mensaje,
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

        setUsuario({
          nombre: '',
          email: '',
          password: '',
          confirmar: ''
        })
        //redireccionar nuevamente a la pagina de login
        navigate("/login");

      };
    }





  };

  const onSubmit = (e) => {
    e.preventDefault();
    crearCuenta();
  }



  return (
    <main className='container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center ' >
      <div className='md:w-2/3 lg:w-2/5'>
        <h1 className="md:flex justify-center inline bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-200 bg-clip-text font-display text-4xl text-transparent">
          Golden Harmony | E-commerce <br></br>
        </h1>
        <h2 className="md:flex justify-center inline bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-200 bg-clip-text font-display text-4xl text-transparent">
          Sign Up
        </h2>
        <form
          className="my-10 bg-white shadow rounded-3xl p-10"
          onSubmit={onSubmit}
        >
          <div className="my-5">

            <label className="uppercase text-gray-600 block text-lx font-bold">Nombre</label>
            <input
              type="nombre"
              id="nombre"
              name="nombre"
              placeholder="Ingrese su nombre"
              className="w-full mt-3 p-3 border rounded-3xl bg-gray-50"
              value={nombre}
              onChange={onChange}
            />
            <label className="uppercase text-gray-600 block text-lx font-bold">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email de Registro"
              className="w-full mt-3 p-3 border rounded-3xl bg-gray-50"
              value={email}
              onChange={onChange}
            />



            <label className="uppercase text-gray-600 block text-lx font-bold">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password de Registro"
              className="w-full mt-3 p-3 border rounded-3xl bg-gray-50"
              value={password}
              onChange={onChange}
            />

            <label className="uppercase text-gray-600 block text-lx font-bold">Confirme su Password</label>
            <input
              type="password"
              id="confirmar"
              name="confirmar"
              placeholder="Confirmación Password"
              className="w-full mt-3 p-3 border rounded-3xl bg-gray-50"
              value={confirmar}
              onChange={onChange}
            />
          </div>
          <input
            type="submit"
            value="Registar Usuario"
            className="bg-yellow-500 mb-5 w-full py-3 text-black uppercase font-bold rounded-3xl hover:cursor-pointer hover:bg-yellow-300 transition-colors"
          />

          <Link
            className="block text-center my-5 "
            to={"/"}
          >
            Regresar
          </Link>
        </form>

      </div>

    </main>
  )

}

export default CrearCuenta;