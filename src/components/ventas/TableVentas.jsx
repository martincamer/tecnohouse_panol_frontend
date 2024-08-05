import { useState } from "react";
import { useVentas } from "../../context/VentasContext"; // Asegúrate de tener un contexto de ventas
import { FaArrowLeft, FaArrowRight, FaSearch } from "react-icons/fa"; // Iconos para la paginación
import { IoIosMore } from "react-icons/io"; // Para el menú de acciones
import { CiCreditCard1 } from "react-icons/ci";
import { Link } from "react-router-dom"; // Para enlaces de navegación
import { Tab, Transition } from "@headlessui/react";
import { ModalImprimirSalida } from "./ModalImprimirSalida";
import { useObtenerId } from "../../helpers/obtenerId";

export const TableVentas = ({ ventas, entradas }) => {
  const { deleteVenta } = useVentas(); // Asegúrate de tener la función para eliminar ventas

  const [currentPage, setCurrentPage] = useState(1);
  const [ventasPerPage] = useState(15); // Número de elementos por página
  const [searchTerm, setSearchTerm] = useState(""); // Para la búsqueda

  // Índices para la paginación
  const indexOfLastVenta = currentPage * ventasPerPage;
  const indexOfFirstVenta = indexOfLastVenta - ventasPerPage;
  const currentVentas = ventas.slice(indexOfFirstVenta, indexOfLastVenta); // Elementos a mostrar

  const currentEntradas = entradas.slice(indexOfFirstVenta, indexOfLastVenta); // Elementos a mostrar

  // Cambiar la página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Manejar búsqueda
  const handleSearch = (event) => {
    setCurrentPage(1); // Restablecer la página al buscar
    setSearchTerm(event.target.value); // Actualizar el término de búsqueda
  };

  // Filtrar ventas por el término de búsqueda
  const filteredVentas = ventas.filter(
    (venta) =>
      venta.tipo?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      venta?.cliente?.nombre
        ?.toLowerCase()
        ?.includes(searchTerm?.toLowerCase()) ||
      venta?.cliente?.apellido
        ?.toLowerCase()
        ?.includes(searchTerm?.toLowerCase())
  );

  const filteredEntradas = currentEntradas.filter((venta) =>
    venta?.proveedor_factura?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const totalPages = Math.ceil(ventas.length / ventasPerPage); // Calcular el total de páginas

  // Obtener los números de las páginas a mostrar
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPages = Math.min(currentPage + 4, totalPages); // Hasta 5 páginas
    const startPage = Math.max(1, maxPages - 4); // Desde la página adecuada
    for (let i = startPage; i <= maxPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const tabStyle = (isSelected) => `
  py-2 px-5 font-semibold capitalize rounded-md  flex gap-2 items-center
  ${
    isSelected
      ? "bg-blue-500 text-white border-sky-700 border-[1px]"
      : "bg-white text-gray-700 border-[1px] border-gray-300"
  } transition  ease-linear outline-none
`;

  const [isOpen, setIsOpen] = useState(false);

  // Alternar la visibilidad
  const toggleSearchBar = () => {
    setIsOpen(!isOpen);
  };

  const { handleObtenerId, idObtenida } = useObtenerId();

  return (
    <div>
      {" "}
      <Tab.Group>
        <Tab.List className={"gap-3 flex mt-8"}>
          <Tab className={({ selected }) => tabStyle(selected)}>
            Ver Salidas <CiCreditCard1 className="font-bold text-2xl" />
          </Tab>
          <Tab className={({ selected }) => tabStyle(selected)}>
            Ver Entradas <CiCreditCard1 className="font-bold text-2xl" />
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <div className="">
              <div className="flex bg-white py-2.5 rounded-md border border-gray-300 w-1/4 px-4 mt-5 mb-5">
                <input
                  type="text"
                  placeholder="Buscar salida por el empleado..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="font-bold text-sm w-full outline-none"
                />
                <FaSearch className="text-gray-800 text-xl" />
              </div>
              <table className="table">
                <thead className="text-gray-800 text-sm">
                  <tr>
                    <th className="">Empleado</th>
                    <th className="">Fabrica</th>
                    <th className="">Zona/Sector</th>
                    <th className="">Fecha/Salida</th>
                  </tr>
                </thead>
                <tbody className="uppercase font-medium text-xs">
                  {filteredVentas
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map((v) => (
                      <tr
                        key={v._id}
                        className="hover:bg-gray-100/50 cursor-pointer"
                      >
                        <th className="">
                          {v?.cliente?.nombre} {v?.cliente?.apellido}
                        </th>
                        <td className="">{v?.cliente?.fabrica}</td>
                        <td className="">{v?.cliente?.zona}</td>
                        <td className="">
                          {v.date?.split("T")[0]} / HORA{" "}
                          {v.date?.split("T")[1].slice(0, 5)}
                        </td>
                        <td className="px-4 py-4">
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
                                  to={`/salida/${v._id}`}
                                >
                                  Ver salida
                                </Link>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleObtenerId(v._id),
                                      document
                                        .getElementById("my_modal_salida")
                                        .showModal();
                                  }}
                                  className="capitalize hover:bg-gray-800 hover:text-white font-semibold text-gray-700"
                                >
                                  Imprimir la salida
                                </button>
                              </li>
                              <li>
                                <button
                                  onClick={() => deleteVenta(v._id)} // Función para eliminar venta
                                  type="button"
                                  className="capitalize hover:bg-gray-800 hover:text-white font-semibold text-gray-700"
                                >
                                  Eliminar salida
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
          </Tab.Panel>
          <Tab.Panel>
            <div className="">
              <div className="flex bg-white py-2.5 rounded-md border border-gray-300 w-1/4 px-4 mt-5 mb-5">
                <input
                  type="text"
                  placeholder="Buscar proveedor o empleado de la entrada..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="font-bold text-sm w-full outline-none"
                />
                <FaSearch className="text-gray-800 text-xl" />
              </div>
              <table className="table">
                <thead className="text-gray-800 text-sm">
                  <tr>
                    <th>Proveedor</th>
                    <th>Factura</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody className="uppercase font-medium text-xs">
                  {filteredEntradas
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map((v) => (
                      <tr
                        key={v._id}
                        className="hover:bg-gray-100/50 cursor-pointer uppercase"
                      >
                        <th>{v?.proveedor_factura}</th>
                        <td>N° {v?.numero_factura}</td>
                        {/* <td>{v?.cliente?.zona}</td> */}
                        <td>
                          {v.date?.split("T")[0]} / HORA{" "}
                          {v.date?.split("T")[1].slice(0, 5)}
                        </td>
                        <td className="px-4 py-4">
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
                              className="dropdown-content z-[1] menu p-1 shadow bg-white rounded-md w-52 gap-1"
                            >
                              <li>
                                <Link
                                  className="capitalize hover:bg-gray-800 hover:text-white font-semibold text-gray-700"
                                  to={`/entrada/${v._id}`}
                                >
                                  Ver entrada
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      <ModalImprimirSalida idObtenida={idObtenida} />
    </div>
  );
};
