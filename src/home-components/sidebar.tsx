import { NavLink } from "react-router-dom";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { BiHome } from "react-icons/bi";
import { FaCloudSun } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { useStore } from "@/context";

const Sidebar = ({ isNavOpen }: { isNavOpen: boolean }) => {
  const { store } = useStore();

  return (
    <div
      className={` bg-white text-font h-screen py-8 relative transition-[width] duration-500 ${
        isNavOpen ? "w-[220px]" : "w-[100px]"
      }`}
    >
      <NavLink to="/">
        <div className="title text-2xl font-bold flex items-center px-8">
          <span>
            <FaCloudSun className="text-4xl transition-none text-primary" />
          </span>
          <span
            className={`ms-2 text-primary ${
              isNavOpen
                ? "opacity-100 scale-100 visible"
                : "opacity-0 scale-75 invisible"
            } transition-all duration-200 delay-100`}
          >
            Weather
          </span>
        </div>
      </NavLink>

      <div className="menu mt-10">
        <ul>
          <li>
            <NavLink
              to="/"
              className={`px-8 py-5 my-5 text-xl flex items-center hover:text-primary border-l-[5px] ${
                store.activeNav === "home"
                  ? "border-primary text-primary"
                  : "border-background"
              }`}
            >
              <span>
                <BiHome className="text-2xl transition-all duration-300" />
              </span>
              <span
                className={`ms-4 ${
                  isNavOpen ? "opacity-100 scale-100" : "opacity-0 scale-75"
                } transition-all duration-300`}
              >
                Home
              </span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/cities"
              className={`px-8 py-5 my-5 text-xl flex items-center hover:text-primary border-l-[5px] ${
                store.activeNav === "cities"
                  ? "border-primary text-primary"
                  : "border-background"
              }`}
            >
              <span>
                <IoLocationOutline className="text-2xl transition-all duration-300" />
              </span>
              <span
                className={`ms-4 ${
                  isNavOpen ? "opacity-100 scale-100" : "opacity-0 scale-75"
                } transition-all duration-300`}
              >
                Cities
              </span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
