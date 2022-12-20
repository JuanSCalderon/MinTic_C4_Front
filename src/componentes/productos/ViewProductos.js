import React from 'react'
import crud from "../../conexiones/crud";
import swal from 'sweetalert';

export const ViewProductos = ({ producto }) => {



    const { _id, nombre, descripcion, stock, precio, imagen } = producto;

    const borrarProducto = async (e, idProducto) => {
        console.log(idProducto)
        swal({
            title: "Are you sure to delete a product?",
            text: "Once deleted, you could not go back",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    e.preventDefault();
                    const response = crud.DELETE(`/api/productos/${idProducto}`);
                    //console.log(response.msg);
                    const mensaje = response.msg;
                    if (response) {
                        swal("The Product has been eliminated", {
                            icon: "success",
                        });
                    }
                    window.location.reload();
                } else {
                    swal("You cancelled the deletion");
                }
            });

    }

    return (
        <div className='border-b p-5 flex justify-between items-center'>
            <div className='flex flex-col items-start'>
                <p className='mb-1 text-xl text-black'>Id:{_id} </p>
                <p className='mb-1 text-xl text-black'>nombre:{nombre} </p>
                <p className='mb-1 text-sm text-blackuppercase '>descripción:{descripcion} </p>
                <p className='mb-1 text-black'>stock:{stock} </p>
                <p className='mb-1  text-black'>precio:$ {precio.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} </p>
                <img src={imagen} width="200" height="200"></img>

            </div>

            <div className='flex flex-col lg:flex-row gap-2'>
                <button
                    className="bg-yellow-400 px-4 py-3 text-black uppercase font-bold text-sm rounded-lg"
                //onClick={() => handleModalEditarTarea(tarea)}
                >Edit</button>

                <button
                    type="submit"
                    value="Delete"
                    className="bg-red-500 px-4 py-3 text-black uppercase font-bold text-sm rounded-lg"
                    onClick={(e) => borrarProducto(e, producto._id)}
                >Delete</button>

            </div>
        </div>
    )
}


export default ViewProductos;