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
        <div className="flex bg-white py-2.5 rounded-xl w-1/4 px-4">
          <input
            type="text"
            placeholder="Buscar producto por codigo o detalle..."
            value={searchTerm}
            onChange={handleSearch}
            className="font-bold text-sm w-full outline-none"
          />
          <FaSearch className="text-sky-700 text-xl" />
        </div>
      </div>
      {/* <div className="flex items-center">
        <button
          onClick={toggleSearchBar}
          className="p-3 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition fixed right-4 z-[100]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>

        <Transition
          show={isOpen}
          enter="transition-all duration-500 ease-out"
          enterFrom="w-0 opacity-0"
          enterTo="w-1/3 opacity-100"
          leave="transition-all duration-500 ease-in"
          leaveFrom="w-1/3 opacity-100"
          leaveTo="w-0 opacity-0"
        >
          <input
            type="text"
            placeholder="Buscar el cliente por el nombre o apellido..."
            value={searchTerm}
            onChange={handleSearch}
            className="px-4 py-2.5 ml-3 rounded-full shadow-lg outline-none focus:ring-sky-500 focus:border-sky-500 font-bold text-sm w-[400px]"
          />
        </Transition>
      </div> */}

      <div className="transition-all ease-linear rounded-2xl mt-6 pb-20">
        <table className="min-w-full bg-white text-sm rounded-2xl table">
          <thead>
            <tr>
              <th className="text-left px-4 py-4 text-sky-500 text-sm uppercase">
                Nombre
              </th>
              <th className="text-left px-4 py-4 text-sky-500 text-sm uppercase">
                Apellido
              </th>
              <th className="text-left px-4 py-4 text-sky-500 text-sm uppercase">
                Fabrica
              </th>
              <th className="text-left px-4 py-4 text-sky-500 text-sm uppercase">
                Sector/zona{" "}
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {filteredClients.map((c) => (
              <tr className="hover:bg-gray-100/50 cursor-pointer" key={c._id}>
                <th className="px-4 py-4 text-gray-900 uppercase text-sm">
                  {c.nombre}
                </th>
                <th className="px-4 py-4 text-gray-500 uppercase text-sm">
                  {c.apellido}
                </th>
                <th className="px-4 py-4 text-gray-500 uppercase text-sm">
                  {c.fabrica}
                </th>
                <th className="px-4 py-4 text-gray-500 uppercase text-sm">
                  {c.zona}
                </th>

                <td className="px-4 py-4 text-gray-500 uppercase text-sm">
                  <div className="dropdown dropdown-left drop-shadow-lg">
                    <div
                      tabIndex={0}
                      role="button"
                      className="py-2 px-2 transition-all hover:bg-sky-500 hover:text-white border-none rounded-full"
                    >
                      <IoIosMore className="text-2xl" />
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 gap-1"
                    >
                      <li>
                        <Link
                          className="capitalize hover:bg-sky-500 hover:text-white font-semibold text-gray-700"
                          to={`/editar-empleado/${c._id}`}
                        >
                          Editar el empleado
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="capitalize hover:bg-sky-500 hover:text-white font-semibold text-gray-700"
                          to={`/empleado/${c._id}`}
                        >
                          Ver el empleado
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => deleteCliente(c._id)}
                          type="button"
                          className="capitalize hover:bg-sky-500 hover:text-white font-semibold text-gray-700"
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
