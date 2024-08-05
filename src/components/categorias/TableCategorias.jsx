import { useEffect, useState } from "react";
import { useProductos } from "../../context/ProductosContext";
import { FaArrowLeft, FaArrowRight, FaSearch } from "react-icons/fa"; // Importar los iconos de flecha
import { IoIosMore } from "react-icons/io";
import { useObtenerId } from "../../helpers/obtenerId";
import ModalEditarCategoria from "./ModalEditarCategoria";
import { useModal } from "../../helpers/modal";
import ModalEliminarCategoria from "./ModalEliminarCategoria";
import { Transition } from "@headlessui/react";

export const TableCategorias = () => {
  const { categorias, getCategorias } = useProductos();

  const {
    closeModal: closeEliminar,
    isOpen: isOpenEliminar,
    openModal: openModalEliminar,
  } = useModal();

  const { handleObtenerId, idObtenida } = useObtenerId();

  const [isEditar, setEditar] = useState(false);

  useEffect(() => {
    getCategorias();
  }, []);

  const openEditar = () => {
    setEditar(true);
  };

  const closeEditar = () => {
    setEditar(false);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(15);
  const [searchTerm, setSearchTerm] = useState("");

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = categorias.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (event) => {
    setCurrentPage(1);
    setSearchTerm(event.target.value);
  };

  const filteredProducts = categorias.filter((product) =>
    product.detalle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(categorias.length / productsPerPage);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPages = Math.min(currentPage + 4, totalPages); // Mostrar hasta 5 páginas
    const startPage = Math.max(1, maxPages - 4); // Comenzar desde la página adecuada
    for (let i = startPage; i <= maxPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const [isOpen, setIsOpen] = useState(false);

  // Alternar la visibilidad
  const toggleSearchBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mt-5">
      {/* <div className="flex items-center">
        <button
          onClick={toggleSearchBar}
          className="p-3 rounded-full bg-gray-800 text-white transition fixed right-4 z-[100]"
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
            placeholder="Buscar categoria por el nombre..."
            value={searchTerm}
            onChange={handleSearch}
            className="px-4 py-2.5 ml-3 rounded-md shadow-lg outline-none border border-gray-300 font-bold text-sm w-[400px]"
          />
        </Transition>
      </div> */}
      <div className="flex bg-white py-2.5 rounded-md border border-gray-300 w-1/4 px-4">
        <input
          type="text"
          placeholder="Buscar la categoria..."
          value={searchTerm}
          onChange={handleSearch}
          className="font-bold text-sm w-full outline-none"
        />
        <FaSearch className="text-gray-800 text-xl" />
      </div>
      <div className="transition-all ease-linear pt-5">
        <table className="table">
          <thead>
            <tr>
              <th className="text-gray-800 font-bold text-sm">
                Fecha de creación
              </th>
              <th className="text-gray-800 font-bold text-sm">
                Nombre de la categoria
              </th>
            </tr>
          </thead>

          <tbody className="text-xs font-medium">
            {filteredProducts.map((p) => (
              <tr className="hover:bg-gray-100/50 cursor-pointer" key={p._id}>
                <td className="">
                  {new Date(p.createdAt).toLocaleDateString()}
                </td>
                <th className="">{p.detalle}</th>
                <th className="">
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
                        <button
                          onClick={() => {
                            handleObtenerId(p._id), openEditar();
                          }}
                          type="button"
                          className="capitalize hover:bg-gray-800 hover:text-white font-semibold text-gray-700"
                        >
                          Editar categoria
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            handleObtenerId(p._id), openModalEliminar();
                          }}
                          className="capitalize hover:bg-gray-800 hover:text-white font-semibold text-gray-700"
                          type="button"
                        >
                          Eliminar categoria
                        </button>
                      </li>
                    </ul>
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalEditarCategoria
        isOpen={isEditar}
        closeModal={closeEditar}
        idObtenida={idObtenida}
      />
      <ModalEliminarCategoria
        closeModal={closeEliminar}
        isOpen={isOpenEliminar}
        idObtenida={idObtenida}
      />
    </div>
  );
};
