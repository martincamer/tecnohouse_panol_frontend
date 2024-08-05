import { useState } from "react";
import { useClientes } from "../../context/ClientesContext"; // Cambia al contexto de clientes
import { FaSearch } from "react-icons/fa"; // Iconos de flecha para paginación
import { IoIosMore } from "react-icons/io";
import { Link } from "react-router-dom";

export const TableClients = ({ clientes }) => {
  const { deleteCliente } = useClientes(); // Cambia al método para eliminar cliente

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredClients = clientes.filter((client) =>
    client.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [isOpen, setIsOpen] = useState(false);

  // Alternar la visibilidad
  const toggleSearchBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mt-5">
      <div>
        <div className="flex bg-white py-2.5 rounded-md border border-gray-300 w-1/4 px-4">
          <input
            type="text"
            placeholder="Buscar el empleado..."
            value={searchTerm}
            onChange={handleSearch}
            className="font-bold text-sm w-full outline-none"
          />
          <FaSearch className="text-gray-800 text-xl" />
        </div>
      </div>

      <div className="transition-all ease-linear pt-5">
        <table className="table">
          <thead className="text-gray-800 text-sm">
            <tr>
              <th className="">Nombre</th>
              <th className="">Apellido</th>
              <th className="">Fabrica</th>
              <th className="">Sector/zona </th>
            </tr>
          </thead>

          <tbody className="text-xs font-medium uppercase">
            {filteredClients.map((c) => (
              <tr className="hover:bg-gray-100/50 cursor-pointer" key={c._id}>
                <td>{c.nombre}</td>
                <td>{c.apellido}</td>
                <th>{c.fabrica}</th>
                <th>{c.zona}</th>

                <td className="">
                  <div className="dropdown dropdown-left drop-shadow-lg">
                    <div
                      tabIndex={0}
                      role="button"
                      className="py-2 px-2 transition-all hover:bg-gray-800 hover:text-white border-none rounded-full"
                    >
                      <IoIosMore className="text-2xl" />
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-1 shadow bg-base-100 rounded-md w-52 gap-1"
                    >
                      <li>
                        <Link
                          className="capitalize hover:bg-gray-800 hover:text-white font-semibold text-gray-700"
                          to={`/editar-empleado/${c._id}`}
                        >
                          Editar el empleado
                        </Link>
                      </li>
                      {/* <li>
                        <Link
                          className="capitalize hover:bg-gray-800 hover:text-white font-semibold text-gray-700"
                          to={`/empleado/${c._id}`}
                        >
                          Ver el empleado
                        </Link>
                      </li> */}
                      <li>
                        <button
                          onClick={() => deleteCliente(c._id)}
                          type="button"
                          className="capitalize hover:bg-gray-800 hover:text-white font-semibold text-gray-700"
                        >
                          Eliminar el empleado
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
