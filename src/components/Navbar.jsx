import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <header
      className={`${
        isAuthenticated ? "bg-gray-800" : "bg-gray-800"
      } z-[-100] max-md:overflow-x-auto`}
    >
      <nav className="flex justify-between items-center py-3 px-10">
        {/* <h1 className="text-2xl font-bold">
          <Link className="relative" to={isAuthenticated ? "/home" : "/"}>
            <p
              className={`${
                isAuthenticated ? "text-white" : "text-sky-500 py-3"
              } z-[-100]`}
            >
              Gestión Pañol Tecnohouse
            </p>
          </Link>
        </h1> */}
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
      {/* {isAuthenticated &&
        (click ? (
          <div
            className={`transition-all ease-linear duration-300 absolute flex justify-center items-center flex-col rounded-bl-xl right-0 bg-white shadow-xl shadow-black/20  py-5 w-1/6 gap-2 z-[100]`}
            ref={menuRef}
          >
            <Link onClick={() => setClick(false)} to={"/perfil"}>
              <img
                src={
                  user?.imagen ||
                  "https://ppstatic.s3.amazonaws.com/expenses/uploads/people/default.png"
                }
                className="
                text-6xl text-sky-600 cursor-pointer hover:shadow transition-all ease-linear rounded-full w-[80px] h-[80px] border shadow-md shadow-gray-300"
              />
            </Link>
            <p className="text-sm capitalize text-slate-700 font-bold">
              {" "}
              {user?.username}
            </p>
            <p className="text-sm capitalize text-slate-500 font-light">
              {" "}
              {user?.email}
            </p>

            <div className="mt-5 flex flex-col gap-2 w-full">
              <div className="cursor-pointer flex gap-2 items-center text-slate-700 font-light hover:bg-sky-100 px-5 py-2 hover:text-sky-600 transition-all ease-linear">
                <MdPerson className="text-4xl" />{" "}
                <Link to={"/perfil"}>Perfil</Link>
              </div>

              <div className="cursor-pointer flex gap-2 items-center text-slate-700 font-light hover:bg-sky-100 px-5 py-2 hover:text-sky-600 transition-all ease-linear">
                <MdWork className="text-4xl" /> Empresa
              </div>

              <div className="cursor-pointer flex gap-2 items-center text-slate-700 font-light hover:bg-sky-100 px-5 py-2 hover:text-sky-600 transition-all ease-linear">
                <BsFiletypePdf className="text-4xl" /> Facturación
              </div>

              <div className="mx-5 my-4">
                <button
                  className="bg-white text-sm border-slate-300 border-[1px] text-sky-700 hover:shadow transition-all ease-linear px-4 py-2 text-white-500 rounded-xl flex items-center gap-2"
                  to="/"
                  onClick={() => {
                    setClick(false);
                    logout();
                  }}
                >
                  Salir de la app
                  <IoLogOutOutline className="text-3xl" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        ))} */}
    </header>
  );
}
