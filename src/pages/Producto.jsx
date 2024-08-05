import { Link, useParams } from "react-router-dom";
import { useProductos } from "../context/ProductosContext";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaPencilAlt } from "react-icons/fa";
import { useObtenerId } from "../helpers/obtenerId";
import { useModal } from "../helpers/modal";
import ModalEliminarProducto from "../components/products/ModalEliminarProducto";
import dayjs from "dayjs";

export function Producto() {
  const { getProducto } = useProductos();

  const { handleObtenerId, idObtenida } = useObtenerId();
  const { openModal, closeModal, isOpen } = useModal();

  const [producto, setProducto] = useState([]);

  const params = useParams();

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await getProducto(params.id); // Usa await correctamente
        setProducto(res);
        console.log("Producto cargado:", res);
      } catch (error) {
        console.error("Error al cargar el producto:", error);
      }
    };

    loadData(); // Llama a la función asíncrona
  }, [params.id]); // Asegúrate de incluir las dependencias necesarias

  const formatDate = (date) => {
    return dayjs(date).format("DD/MM/YYYY"); // Formato de fecha
  };

  return (
    <div>
      <div className="bg-white w-full flex justify-between items-center ">
        <div className="flex border-b w-full border-gray-300">
          <Link
            to={"/productos"}
            className="bg-gray-100/50 px-8 text-base py-4 text-gray-700 font-medium hover:text-primary transition-all flex items-center gap-3"
          >
            <FaArrowLeft className="" /> Productos
          </Link>
          <Link
            to={`/producto/${params.id}`}
            className="bg-primary/10 px-8 text-base py-4 text-primary font-bold hover:bg-gray-100 transition-all"
          >
            Detalle del producto
          </Link>
        </div>
      </div>
      <div className="mx-10 py-10">
        <div className="flex flex-col gap-1">
          <p className="font-bold text-slate-700 text-xl">
            Producto obtenido{" "}
            <span className="text-blue-500">{producto.codigo}</span>
          </p>
          <p className="text-slate-600 font-semibold text-sm">
            En esta sección podras crear nuevos productos.
          </p>
        </div>

        <div className="flex gap-10 mt-10">
          <div className="bg-white rounded-xl shadow-lg w-1/2">
            <div className="py-10 px-10 bg-gray-800 rounded-t-md flex justify-between">
              <div className="flex flex-col gap-5">
                <p className="text-white">
                  Fecha de creación{" "}
                  <span className="text-white font-bold">
                    {formatDate(producto.date)}
                  </span>
                </p>
                <p className="text-white">
                  Codigo del producto{" "}
                  <span className="text-white font-bold">
                    {producto.codigo}
                  </span>
                </p>
              </div>
              <div className="flex flex-col gap-5 text-white">
                <p>
                  Estado{" "}
                  <span
                    className={`py-2 px-5 rounded-md ${
                      producto.stock === 0
                        ? "bg-red-500 text-white font-bold" // Para cuando el stock es 0
                        : producto.stock < producto.stock_minimo
                        ? "bg-primary text-white font-bold" // Para cuando el stock es menor al mínimo
                        : "bg-green-500 text-white font-bold" // Para cuando el stock es mayor o igual al mínimo
                    }`}
                  >
                    {producto.stock === 0
                      ? "No hay stock" // Mensaje cuando el stock es 0
                      : producto.stock < producto.stock_minimo
                      ? "Poco stock" // Mensaje cuando el stock es menor al mínimo
                      : "Mucho stock"}{" "}
                  </span>
                </p>
                <p>
                  Total del stock cargado{" "}
                  <span
                    className={`py-2 px-3 rounded-lg ${
                      producto.stock === 0
                        ? "bg-red-500 text-white font-bold" // Fondo rojo para stock cero
                        : producto.stock < producto.stock_minimo
                        ? "bg-primary text-white font-bold" // Fondo naranja para stock bajo
                        : "bg-green-500 text-white font-bold" // Fondo verde para stock suficiente
                    }`}
                  >
                    <span className="font-bold">{producto.stock}</span>{" "}
                    {/* Valor de stock */}
                  </span>
                </p>
              </div>
            </div>
            <div className="py-5 px-5 bg-blue-100 text-center text-blue-500 font-bold">
              Descripción del producto
            </div>
            <div className="py-10 px-10 bg-white  grid grid-cols-3 gap-6">
              <p className="font-bold flex flex-col">
                Categoria del producto{" "}
                <span className="text-gray-400 uppercase font-semibold">
                  {producto.categoria}
                </span>
              </p>
              <p className="font-bold flex flex-col">
                Descripcioń del producto{" "}
                <span className="text-gray-400 uppercase font-semibold">
                  {producto.detalle}
                </span>
              </p>
              <p className="font-bold flex flex-col">
                Color del producto{" "}
                <span className="text-gray-400 uppercase font-semibold">
                  {producto.color}
                </span>
              </p>
              <p className="font-bold flex flex-col">
                Tipo del producto{" "}
                <span className="text-gray-400 uppercase font-semibold">
                  {producto.tipo}
                </span>
              </p>
              <p className="font-bold flex flex-col">
                Stock minimo del producto{" "}
                <span className="text-gray-400 uppercase font-semibold">
                  {producto.stock_minimo}
                </span>
              </p>
              <p className="font-bold flex flex-col">
                Stock maximo del producto{" "}
                <span className="text-gray-400 uppercase font-semibold">
                  {producto.stock_maximo}
                </span>
              </p>
            </div>
            <div className="py-10 px-10 bg-white rounded-b-xl">
              <p className="font-bold flex flex-col">Imagen del producto </p>

              <img src={producto.imagen} className="w-[300px]" />

              <div className="flex justify-end gap-6 my-4">
                <button
                  onClick={() => {
                    handleObtenerId(producto._id), openModal();
                  }}
                  type="button"
                  className="hover:bg-orange-100 text-orange-400 hover:text-orange-400 transition-all font-semibold text-[15px] px-6 py-2 rounded-md"
                >
                  Eliminar producto
                </button>

                <Link
                  to={`/editar-producto/${producto._id}`}
                  type="button"
                  className="bg-blue-500 text-white font-semibold text-[15px] px-6 py-3 rounded-md transition-all flex items-center gap-2 hover:bg-blue-600"
                >
                  Editar producto
                  <FaPencilAlt className="w-4 h-4" />{" "}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalEliminarProducto
        closeModal={closeModal}
        isOpen={isOpen}
        idObtenida={idObtenida}
      />
    </div>
  );
}
