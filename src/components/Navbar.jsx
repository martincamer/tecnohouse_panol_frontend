import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { MenuMobile } from "./MenuMobile";

export function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header
      className={`${
        isAuthenticated ? "bg-gray-800" : "bg-gray-800"
      } z-[-100] max-md:overflow-x-auto max-md:py-6`}
    >
      <nav className="flex justify-between items-center py-3 px-10 max-md:hidden">
        <div className="flex justify-between gap-5 py-2">
          <Link to={isAuthenticated ? "/home" : "/"}>
            <img src="https://app.holded.com/assets/img/brand/holded-logo.svg" />
          </Link>
          {isAuthenticated && (
            <div className="flex gap-2">
              <Link
                to={"/productos"}
                className="text-white font-bold py-1 px-4 hover:bg-gray-600 rounded-md"
              >
                Productos
              </Link>{" "}
              <Link
                to={"/empleados"}
                className="text-white font-bold py-1 px-4 hover:bg-gray-600 rounded-md"
              >
                Empleados
              </Link>{" "}
              <Link
                to={"/registros"}
                className="text-white font-bold py-1 px-4 hover:bg-gray-600 rounded-md"
              >
                Registros
              </Link>
              <Link
                to={"/herramientas"}
                className="text-white font-bold py-1 px-4 hover:bg-gray-600 rounded-md"
              >
                Cajones/herramientas
              </Link>
            </div>
          )}
        </div>
        <ul className="flex gap-x-4">
          {isAuthenticated ? (
            <div>
              <button
                onClick={() => logout()}
                className="text-white py-1 px-2 rounded-md bg-primary font-bold text-sm"
              >
                Salir de la cuenta
              </button>
            </div>
          ) : (
            <>
              <li>
                <Link
                  className="font-semibold text-white bg-primary py-2 px-6 rounded-md text-sm hover:shadow-md  transition-all"
                  to="/"
                >
                  Iniciar Sesion
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
