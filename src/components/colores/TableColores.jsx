import { useEffect, useState } from "react";
import { useProductos } from "../../context/ProductosContext";
import { FaArrowLeft, FaArrowRight, FaSearch } from "react-icons/fa"; // Importar los iconos de flecha
import { IoIosMore } from "react-icons/io";
import { useObtenerId } from "../../helpers/obtenerId";
import { useModal } from "../../helpers/modal";
import ModalEliminarCategoria from "./ModalEliminarCategoria";
import ModalEditarCategoria from "./ModalEditarCategoria";
import { Transition } from "@headlessui/react";

export const TableColores = () => {
  const { colores, getColores } = useProductos();

  const {
    closeModal: closeEliminar,
    isOpen: isOpenEliminar,
    openModal: openModalEliminar,
  } = useModal();

  const { handleObtenerId, idObtenida } = useObtenerId();

  const [isEditar, setEditar] = useState(false);

  useEffect(() => {
    getColores();
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
  const currentProducts = colores.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (event) => {
    setCurrentPage(1);
    setSearchTerm(event.target.value);
  };

  const filteredProducts = colores.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(colores.length / productsPerPage);

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
      <div className="py-5">
        <table className="table">
          <thead>
            <tr>
              <th className="text-gray-800 font-bold text-sm">
                Fecha de creación
              </th>
              <th className="text-gray-800 font-bold text-sm">
                Nombre del color
              </th>
            </tr>
          </thead>

          <tbody className="text-xs font-medium">
            {filteredProducts.map((p) => (
              <tr className="hover:bg-gray-100/50 cursor-pointer" key={p._id}>
                <td className="">{new Date(p.date).toLocaleDateString()}</td>
                <td className="font-bold">{p.name}</td>
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
                        <button
                          onClick={() => {
                            handleObtenerId(p._id), openEditar();
                          }}
                          type="button"
                          className="capitalize hover:bg-gray-800 hover:text-white font-semibold text-gray-700"
                        >
                          Editar el color
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            handleObtenerId(p._id), openModalEliminar();
                          }}
                          type="button"
                          className="capitalize hover:bg-gray-800 hover:text-white font-semibold text-gray-700"
                        >
                          Eliminar el color
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
