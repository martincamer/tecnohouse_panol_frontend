import { useState } from "react";
import { useAuth } from "../../src/context/authContext";
import { Link, useLocation } from "react-router-dom";
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";

export const MenuMobile = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOverlayClick = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <div
      className={`${
        isOpen ? "w-64 opacity-1" : "w-0 opacity-1"
      } transition-all ease-linear flex flex-col bg-white  min-h-[220vh] max-h-full h-full z-[1000] border-r max-md:fixed md:hidden`}
    >
      {/* Botón de menú */}
      <div
        className={`py-4 px-4 fixed top-[-8px] ${
          isOpen ? "flex justify-between items-center" : ""
        }`}
      >
        <button className="text-4xl px-2" onClick={handleToggle}>
          {isOpen ? (
            <IoCloseOutline className="text-primary" />
          ) : (
            <IoMenuOutline className="text-white" />
          )}
        </button>
        {isOpen && (
          <div>
            <p className="bg-gray-800 py-1 px-2 rounded-md text-xs text-white capitalize font-bold">
              {user?.username}
            </p>
          </div>
        )}
      </div>
      {isOpen && (
        <div className="w-full max-h-full min-h-full h-full flex flex-col gap-0">
          <Link
            onClick={() => setIsOpen(!isOpen)}
            to={"/home"}
            className={`${
              location.pathname === "/home"
                ? "bg-primary text-white"
                : "bg-none"
            } hover:text-primary  font-semibold text-sm transition-all py-3 px-3`}
          >
            Inicio
          </Link>{" "}
          <Link
            onClick={() => setIsOpen(!isOpen)}
            to={"/productos"}
            className={`${
              location.pathname === "/productos"
                ? "bg-primary text-white"
                : "bg-none"
            } hover:text-primary  font-semibold text-sm transition-all py-3 px-3`}
          >
            Sector productos
          </Link>
          <button
            type="button"
            onClick={() => logout()}
            className={`bg-gray-800 py-2 px-3 text-white font-bold text-sm`}
          >
            Cerrar sesión
          </button>
        </div>
      )}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/0 opacity-50 z-[-1]"
          onClick={handleOverlayClick}
        />
      )}
    </div>
  );
};
