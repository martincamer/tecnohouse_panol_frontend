import { useState } from "react";
import { useProductos } from "../../context/ProductosContext";
import { FaSearch } from "react-icons/fa"; // Importar los iconos de flecha
import { IoIosMore } from "react-icons/io";
import { Link } from "react-router-dom";
import { useModal } from "../../helpers/modal";
import { useObtenerId } from "../../helpers/obtenerId";
import ModalEditarStock from "../modals/ModalEditarStock";
import { ModalImprimirProductos } from "./ModalImprimirProductos";

export const TableProducts = ({ productos }) => {
  const { deleleteProducto } = useProductos();
  const { closeModal, isOpen, openModal } = useModal();
  const { handleObtenerId, idObtenida } = useObtenerId();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todos"); // Estado para la categoría seleccionada, inicialmente "todos"

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredProducts = productos.filter(
    (product) =>
      (selectedCategory === "todos" ||
        product.categoria === selectedCategory) && // Filtrar por categoría seleccionada
      (product.detalle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.codigo.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Función para ordenar los productos por stock de mayor a menor
  const orderedProducts = [...filteredProducts].sort(
    (a, b) => b.stock - a.stock
  );

  // Obtener lista de categorías únicas de los productos
  const categories = [
    ...new Set(productos.map((product) => product.categoria)),
  ];

  orderedProducts.sort((a, b) => Number(b.stock) - Number(a.stock));

  return (
    <div className="my-6 px-10">
      <div className="bg-white pb-5 rounded-xl">
        <button
          type="button"
          onClick={() =>
            document.getElementById("my_modal_imprimir_productos").showModal()
          }
          className="bg-primary text-white text-sm rounded-md font-bold py-1.5 px-6"
        >
          Imprimir catalogo/inventario
        </button>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex bg-white py-2.5 rounded-md border border-gray-300 w-1/4 px-4">
          <input
            type="text"
            placeholder="Buscar producto por codigo o detalle..."
            value={searchTerm}
            onChange={handleSearch}
            className="font-bold text-sm w-full outline-none"
          />
          <FaSearch className="text-gray-800 text-xl" />
        </div>
        <select
          className="bg-white py-2.5 rounded-md border border-gray-300 px-2 font-bold text-sm text-gray-600 outline-none"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option className="font-bold text-sky-700" value="todos">
            Filtrar por todas las categorias
          </option>
          {categories.map((category, index) => (
            <option
              className="font-bold uppercase"
              key={index}
              value={category}
            >
              {category}
            </option>
          ))}
        </select>
        {/* </Transition> */}
      </div>
      <div className="transition-all ease-linear rounded-md mt-6 z-0 pb-20">
        <table className="table">
          <thead className="font-bold text-gray-800 text-sm">
            <tr>
              <th className="">Codigo</th>
              <th className="">Descripción</th>
              <th className="">Color</th>
              <th className="">Categoria</th>
              <th className="">Tipo</th>
              <th className="">Stock</th>
              <th className="">Stock Minimo</th>
              <th className="">Stock Máximo</th>
              <th className="">Estado</th>
              <th className="">Vista</th>
            </tr>
          </thead>

          <tbody className="font-medium text-xs uppercase">
            {orderedProducts.map((p) => (
              <tr className="hover:bg-gray-100/50 cursor-pointer" key={p._id}>
                <td className="">{p.codigo}</td>
                <td className="">{p.detalle}</td>
                <td className="">{p.color}</td>
                <td className="">{p.categoria}</td>
                <td className="">{p.tipo}</td>
                <td className="">
                  <div className="flex">
                    <p
                      className={`py-1 font-bold px-2.5 rounded-md ${
                        Number(p.stock) <= 0
                          ? "bg-red-500 text-white shadow-md"
                          : "bg-blue-500 text-white shadow-md"
                      }`}
                    >
                      {p.stock}
                    </p>
                  </div>
                </td>
                <td className=" ">{p.stock_minimo}</td>
                <td className=" ">{p.stock_maximo}</td>
                <td className=" ">
                  <div className="flex">
                    <p
                      className={`py-1 px-2.5 rounded-md font-bold ${
                        (Number(p.stock_minimo) >= Number(p.stock) &&
                          "bg-primary text-white") || // Condición para poco stock (naranja)
                        (Number(p.stock_minimo) <= Number(p.stock) &&
                          "bg-green-600 text-white") || // Condición para suficiente stock (verde)
                        (Number(p.stock) >= Number(p.stock_maximo) &&
                          "bg-blue-500 text-white") || // Condición para mucho stock (celeste)
                        (Number(p.stock) <= 0 && "bg-red-500 text-white") // Condición para sin stock (rojo)
                      }`}
                    >
                      {(Number(p.stock_minimo) >= Number(p.stock) &&
                        "Queda poco stock") ||
                        (Number(p.stock_minimo) <= Number(p.stock) &&
                          "Hay stock suficiente") ||
                        (Number(p.stock) >= Number(p.stock_maximo) &&
                          "Hay mucho stock") ||
                        (Number(p.stock) < 0 && "No hay stock")}{" "}
                    </p>
                  </div>
                </td>
                <td className="">
                  <img src={p.imagen} width={40} />
                </td>
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
                      className="dropdown-content z-[1] menu p-1 shadow bg-base-100 rounded-md w-52"
                    >
                      {" "}
                      <li>
                        <button
                          type="button"
                          onClick={() => {
                            handleObtenerId(p._id), openModal();
                          }}
                          className="capitalize hover:bg-gray-800 hover:text-white font-semibold text-gray-700"
                        >
                          Editar el stock
                        </button>
                      </li>
                      <li>
                        <Link
                          className="capitalize hover:bg-gray-800 hover:text-white font-semibold text-gray-700"
                          to={`/editar-producto/${p._id}`}
                        >
                          Editar el producto
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="capitalize hover:bg-gray-800 hover:text-white font-semibold text-gray-700"
                          to={`/producto/${p._id}`}
                        >
                          Ver el producto
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => deleleteProducto(p._id)}
                          type="button"
                          className="capitalize hover:bg-gray-800 hover:text-white font-semibold text-gray-700"
                        >
                          Eliminar el producto
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
      <ModalEditarStock
        closeModal={closeModal}
        idObtenida={idObtenida}
        isOpen={isOpen}
      />
      <ModalImprimirProductos productos={productos} />
    </div>
  );
};
