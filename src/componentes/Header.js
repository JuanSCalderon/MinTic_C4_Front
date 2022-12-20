import React from "react";
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const navigate = useNavigate();

    const cerrarSesion = () => {
        localStorage.removeItem("token");
        navigate("/");
    }


    return (
        <header className="px-4 py-5 bg-black border-b">
            <div className="md:flex md:justify-between">
                <h2 className="text-4xl bg-gradient-to-r from-yellow-500 via-yellow-500 to-yellow-800 bg-clip-text font-display  text-transparent  font-black text-center mb-5 md:mb-0">
                    Admin Panel
                </h2>

                <div className="flex flex-col md:flex-row items-center gap-4">
                    <input
                        type="submit"
                        value="Sign Out"
                        className="bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-200 mb-5 w-32 py-2 text-white uppercase font-bold text-sm rounded-3xl hover:cursor-pointer  "
                        onClick={cerrarSesion}
                    />
                </div>
            </div>
        </header>
    );
}

export default Header;