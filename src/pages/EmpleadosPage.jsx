import { useEffect, useState } from "react";
import { useClientes } from "../context/ClientesContext.jsx"; // Cambia el contexto a Clientes
import { ImFileEmpty } from "react-icons/im";
import { BsFolderPlus } from "react-icons/bs";
import { TableClients } from "../components/clients/TableClients.jsx"; // Cambia la tabla de productos por la de clientes
import { IoIosAddCircleOutline } from "react-icons/io";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Link } from "react-router-dom";

export function EmpleadosPage() {
  const { clientes, getClientes } = useClientes(); // Cambia a clientes y función para obtener clientes

  useEffect(() => {
    getClientes(); // Obtiene los clientes cuando el componente se monta
  }, []); // Recuerda agregar cualquier dependencia necesaria para evitar advertencias

  return (
    <div>
      <div className="bg-white w-full flex justify-between items-center ">
        <div className="flex">
          <p className="bg-sky-100/80 px-8 text-[16px] py-4 text-sky-600 font-semibold">
            Clientes
          </p>
        </div>
        <div className="mx-5 z-[0] flex gap-2">
          <button className="text-sm font-semibold bg-green-500/90 py-2 px-5 rounded-2xl text-white group flex gap-3 items-center relative transition-all ease-linear duration-300 z-0">
            <Link
              to={"/crear-empleado"}
              className="transition-opacity duration-300 opacity-100 group-hover:opacity-0"
            >
              Crear nuevo empleado
            </Link>
            <IoIosAddCircleOutline className="text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute left-0 right-0 top-0 bottom-0 m-auto" />
          </button>
        </div>
      </div>

      {clientes.length === 0 && (
        <div className="flex flex-col gap-6 justify-center items-center p-10 bg-white w-1/3 mx-auto my-10 rounded-xl shadow">
          <div>
            <ImFileEmpty className="text-6xl text-sky-500 m-auto my-2" />
            <h1 className="font-bold text-lg text-gray-500">
              No hay ningún empleado cargado aún
            </h1>
          </div>
          <div>
            <Link
              to={"/crear-empleado"}
              className="bg-sky-500 text-white py-3 px-6 rounded-full font-semibold text-sm hover:shadow-md transition-all ease-linear flex gap-2 items-center"
            >
              Crear nuevo empleado
              <BsFolderPlus className="text-2xl" />
            </Link>
          </div>
        </div>
      )}

      {clientes.length > 0 && (
        <div className="flex flex-col gap-5 mx-10">
          <section className="py-10 grid grid-cols-3 gap-4">
            <div className="stats shadow-xl items-center">
              <div className="stat">
                <div className="stat-title font-semibold">
                  Total empleados cargados
                </div>
                <div className="stat-value">{clientes.length}</div>
                <div className="stat-desc font-bold text-green-500 mt-1">
                  ↗︎ {clientes.length % 100}%
                </div>
              </div>

              <div>
                <div className="py-5 px-5 w-32 font-bold mx-auto">
                  <CircularProgressbar
                    value={clientes.length % 100}
                    text={`${clientes.length % 100}%`}
                    strokeWidth={9}
                    // backgroundPadding={"#22c55e"}
                    styles={buildStyles({
                      textColor: "#0287e0",
                      pathColor: "#0287e0",
                      trailColor: "#e5e7eb",
                    })}
                  />
                </div>
              </div>
            </div>
          </section>
          <div className="bg-white rounded-xl py-5 px-5 transition-all ease-linear flex gap-2 text-sm">
            <Link
              to={"/crear-empleado"}
              className="bg-sky-500 py-3 px-6 rounded-full text-white font-semibold group flex gap-3 items-center relative transition-all"
            >
              Crear nuevo empleado
            </Link>
          </div>
          <TableClients clientes={clientes} />{" "}
        </div>
      )}
    </div>
  );
}
