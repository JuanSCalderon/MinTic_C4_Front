import React from "react";
import { Link } from 'react-router-dom';

const Sidebar = () => {

  return (
    <aside className="md:w-80 lg:w-60 px-5 py-10 bg-gradient-to-r from-black  to-yellow-600">


      <Link
        className="bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-200 w-full p-3 text-black uppercase font-bold mt-5 text-center rounded-3xl"
        to={"/crear-categoria"}
      >
        Create Category
      </Link>

      <div className="py-10">
        <Link
          className="bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-200 w-full p-3 text-black uppercase font-bold mt-5 text-center rounded-3xl"
          to={"/admin"}
        >
          Admin Categories
        </Link>

      </div>



    </aside>
  );
}

export default Sidebar;