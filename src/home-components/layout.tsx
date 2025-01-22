import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import { IoMenuOutline } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { useStore } from "@/context";

export default function Layout() {
  const { store, setStoreFunc } = useStore();
  const toogleNav = () => {
    setStoreFunc("isNavOpen", !store.isNavOpen);
    console.log(store.isNavOpen);
  };
  return (
    <div className="flex bg-background">
      <Sidebar isNavOpen={store.isNavOpen} />

      <div>
        <div className="navbar flex items-center gap-10 py-8 px-5">
          <div className={`burger transition-all duration-500`}>
            <IoMenuOutline
              className="text-4xl cursor-pointer"
              onClick={toogleNav}
            />
          </div>

          <div className="searchbar flex items-center bg-white rounded-full">
            <span>
              <IoSearchOutline className="text-xl text-font ms-5" />
            </span>
            <input
              type="text"
              name="search"
              placeholder="Search..."
              className="border-none outline-none ms-2 text-font placeholder:text-font text-md bg-transparent w-[500px] py-3"
              autoComplete="off"
            />
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
}
