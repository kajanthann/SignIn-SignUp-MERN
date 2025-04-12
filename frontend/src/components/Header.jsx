import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Header = () => {
  const { token, setToken } = useContext(UserContext);
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b bg-white">
      <Link to="/">
        <img
          className="h-9"
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/dummyLogoColored.svg"
          alt="Logo"
        />
      </Link>

      <div className="hidden sm:flex items-center gap-8">
        <Link to="/">Home</Link>
        <Link to="#">About</Link>
        <Link to="#">Contact</Link>

        {!token ? (
          <Link to="/login">
            <button className="px-8 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600">
              Login
            </button>
          </Link>
        ) : (
          <div className="relative group">
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer">
              <span className="text-sm font-medium">P</span>
            </div>
            <ul className="absolute z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible bg-white border rounded-lg p-2 mt-2 transition-opacity duration-300">
              <li className="px-4 py-1 hover:bg-gray-100 rounded">Profile</li>
              <hr />
              <li onClick={logOut} className="px-4 py-1 hover:bg-gray-100 rounded cursor-pointer">
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
