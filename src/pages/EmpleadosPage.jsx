import { useEffect, useState } from "react";
import { useClientes } from "../context/ClientesContext.jsx"; // Cambia el contexto a Clientes
import { ImFileEmpty } from "react-icons/im";
import { BsFolderPlus } from "react-icons/bs";
import { TableClients } from "../components/clients/TableClients.jsx"; // Cambia la tabla de productos por la de clientes
import { IoIosAddCircleOutline } from "react-icons/io";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

export function EmpleadosPage() {
  const { clientes, getClientes } = useClientes(); // Cambia a clientes y función para obtener clientes

  useEffect(() => {
    getClientes(); // Obtiene los clientes cuando el componente se monta
  }, []); // Recuerda agregar cualquier dependencia necesaria para evitar advertencias

  return (
    <div>
      <div className="bg-gray-100 py-10 px-10 flex items-center justify-between">
        <p className="font-bold text-2xl">Sector de empleados.</p>
        <Link
          to={"/crear-empleado"}
          className="bg-primary text-sm rounded-md font-semibold py-2 px-4 text-white group flex gap-3 items-center relative transition-all"
        >
          <span className="transition-opacity duration-300 opacity-100 group-hover:opacity-0">
            Crear nuevo empledo
          </span>
          <FaUser className="text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute left-0 right-0 top-0 bottom-0 m-auto" />
        </Link>
      </div>

      <div className="flex flex-col gap-5 px-10 py-5">
        <TableClients clientes={clientes} />{" "}
      </div>
    </div>
  );
}
