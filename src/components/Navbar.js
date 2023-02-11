import React from "react";
import Logo from "../images/LOGO-SECONDARIO.svg";
import Bot from "../images/bot.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user, name, logOut } = useAuth();

  // router navigation
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };
  return (
    // Main nav
    <div className=" w-full h-[90px] relative">
      <div className="absolute w-full h-full bg-[#3E8A5F]">
        <div className="xl:w-[860px] bg-transparent h-full mx-auto flex justify-between items-center">
          <div className="">
            <img
              className="w-[180px] h-[32px] cursor-pointer"
              src={Logo}
              alt="Logo"
              onClick={handleLogoClick}
            />
          </div>
          <div className="flex gap-3 items-center text-white bg-transparent text-[24px]">
            <div>
              <select
                name="lang"
                id="lang"
                className="bg-[#3E8A5F] focus:outlin text-white"
              >
                <option value="eng">English</option>
              </select>
            </div>
            <div className="flex gap-2 items-center">
              <span>
                {user?.first_name ? (
                  <NavLink to="/profile">{user?.first_name}</NavLink>
                ) : null}
              </span>
              {/* <img
                className="h-[50px] w-[50px] rounded-full cursor-pointer"
                src={Bot}
                alt="User"
              /> */}
              {user?.username && (
                <button
                  onClick={() => logOut()}
                  className="bg-red-500 text-white px-2 py-1 hover:bg-red-600 text-sm font-bold transition-all duration-150"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
