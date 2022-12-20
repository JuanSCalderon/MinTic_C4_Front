import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import crud from '../conexiones/crud';
import swal from 'sweetalert';

const Login = () => {

  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    email: '',
    password: ''
  });

<<<<<<< HEAD
  const { email, password } = usuario;
=======
  const { email, password} = usuario; //Correo, Contraseña
>>>>>>> cda37b8f985cbc80147ef65d6cd96cd02eb9b4df


  const onChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  };


  const ingresarCuenta = async () => {
    // los dos password deben ser iguales
    const data = {
      email: usuario.email,
      password: usuario.password
    }
    console.log(data);
    const response = await crud.POST(`/api/auth`, data);
    const mensaje = response.msg;
    //console.log(mensaje);
    if (mensaje === "el usuario no existe") {
      const mensaje = "el usuario no existe";
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
    } else if (mensaje === "password incorrecto") {
      const mensaje = "password incorrecto";
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
      const jwt = response.token;

      //guardar la informacion en el localStorage
      localStorage.setItem('token', jwt);

      //redireccionar nuevamente a la pagina de login
      navigate("/admin");
    }



  };

  const onSubmit = (e) => {
    e.preventDefault();
    ingresarCuenta();
  }

  return (

    <main className=' container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center'>
      <div className=' md:w-2/3 lg:w-2/5'>
        <h1 className="md:flex justify-center inline bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-200 bg-clip-text font-display text-4xl text-transparent">
          Golden Harmony | E-commerce <br></br>
        </h1>
        <h2 className="md:flex justify-center inline bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-200 bg-clip-text font-display text-4xl text-transparent">
          Log In
        </h2>

        <form
          onSubmit={onSubmit}
          className="my-10 bg-white shadow rounded-3xl p-10"
        >
          <div className="my-5">
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
          </div>
          <input
            type="submit"
            value="Sign In"
            className="bg-yellow-500 mb-5 w-full py-3 text-black uppercase font-bold rounded-3xl hover:cursor-pointer hover:bg-yellow-300 transition-colors"
          />

          <Link
            className="block text-center my-5 "
            to={"/crear-cuenta"}
          >
            Sign Up
          </Link>
        </form>

      </div>

    </main>
  );
}

export default Login;