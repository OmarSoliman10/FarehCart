import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faSearch, faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import LOGO from '../../assets/images/freshcart-logo.svg'
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";


export default function Navbar() {

  let {userLogin , setUserLogin} = useContext(UserContext);
  let navigate = useNavigate();

  function logout(){
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate('/login')
  }

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const menuItems = [
    { name: "Home" , link:"" },
    { name: "cart" , link:"/cart"  },
    { name: "categories" , link:"/categories" },
    { name: "brands" , link:"/brands" },
    { name: "products" , link:"/products" },
  ];

  return <>
      <nav className="bg-white shadow-lg static   w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">

            {/* Logo and primary nav */}
            <div className="flex items-center">

              <div className="flex-shrink-0 flex items-center">
                <NavLink to={''}> 
                  <img src={LOGO} width={130}   />
                </NavLink>
              </div>

              {/* Desktop Navigation */}
              <ul className="hidden md:ml-6 md:flex md:space-x-8">
                {
                  userLogin !== null? <li>
                  {menuItems.map((item) => (
                    <NavLink key={item.name} to={item.link}
                      className="inline-flex items-center px-5 pt-1 text-lg font-medium  hover:text-green-800 hover:border-indigo-600 transition-colors duration-200"
                    >
                      {item.name}
                    </NavLink>
                  ))}
                  </li>:null
                }

              </ul>
            </div>

            {/* Secondary Navigation */}
            <ul className="hidden md:flex items-center space-x-4">
                {userLogin==null? <>
                  <li >
                <NavLink to={'/login'} className="p-2 text-lg font-medium  hover:text-gray-800 transition-colors duration-200"
                >login</NavLink>
              </li>
              <li >
                <NavLink to={'/register'} className="p-2 text-lg font-medium  hover:text-gray-800 transition-colors duration-200"
                >Register</NavLink>
              </li></>:               <li >
                <span onClick={logout} className="p-2 text-lg font-medium  hover:text-gray-800 transition-colors duration-200 cursor-pointer">Logout <i className="fa-solid fa-right-from-bracket"></i></span>
              </li>}

            </ul>






            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center px-5 pt-1 text-lg font-medium  hover:text-gray-800 hover:border-indigo-600 transition-colors duration-200"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="lg" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
          <ul className="pt-2 pb-3 space-y-1">
          {
                  userLogin !== null? <li>
                  {menuItems.map((item) => (
                    <NavLink key={item.name} to={item.link}
                    className="flex items-center px-4 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                    >
                      {item.name}
                    </NavLink>
                  ))}
                  </li>:null
                }
          </ul>

          <ul>
                {userLogin==null? <>        
                  <li >
                  <NavLink to={'/login'} className="flex items-center px-4 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                >login</NavLink>
              </li>
              <li >
              <NavLink to={'/register'} className="flex items-center px-4 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                >Register</NavLink>
              </li></>:               <li >
              <span onClick={logout} className="flex items-center px-4 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                >Logout</span>              </li>}

          </ul>

        </div>
      </nav>
  </>
}
