import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoMdClose } from "react-icons/io";
import { useProductos } from "../../context/ProductosContext";
import { generateRandomNumericId } from "../../helpers/generateId";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

export default function ModalProductos({ isOpen, closeModal, addToProducto }) {
  const { productos, getProductos } = useProductos();

  const [searchTerm, setSearchTerm] = useState(""); // Para la búsqueda
  const [productoData, setProductoData] = useState([]);

  // Índices para la paginación

  const handleSearch = (event) => {
    setSearchTerm(event.target.value); // Actualizar el término de búsqueda
  };

  // Filtrar ventas por el término de búsqueda
  const filteredVentas = productos.filter(
    (venta) =>
      venta?.codigo?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      venta?.detalle?.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  useEffect(() => {
    getProductos();
  }, []);

  dayjs.extend(utc);
  const fechaActual = dayjs().utc().format();

  const handleInputChange = (index, field, value) => {
    setProductoData((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        [field]: value,
      },
    }));
  };

  const handleAddProducto = (index, producto) => {
    const data = productoData[index] || {};

    addToProducto(
      producto._id,
      generateRandomNumericId(),
      producto.codigo,
      producto.detalle,
      producto.imagen,
      producto.color,
      producto.categoria,
      producto.tipo,
      parseFloat(data.cantidad) || 1,
      fechaActual
    );

    setProductoData({});
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[102]" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full h-full items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full transform h-full overflow-hidden bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-end py-2">
                  <IoMdClose
                    onClick={closeModal}
                    className="hover:text-blue-700 rounded-full transition-all cursor-pointer text-4xl py-1.5 text-slate-800 bg-gray-200"
                  />
                </div>

                <div className="flex flex-col gap-5 items-center">
                  <p className="font-semibold text-slate-700 text-lg">
                    Seleccionar productos 👋
                  </p>

                  <div className="w-full">
                    {" "}
                    <input
                      type="text"
                      placeholder="Buscar producto por el codigo o detalle..."
                      value={searchTerm}
                      onChange={handleSearch}
                      className="px-4 py-2.5 ml-3 rounded-md shadow-lg outline-none focus:ring-blue-500 focus:border-blue-500 font-bold text-sm w-[400px] border"
                    />
                  </div>

                  <div className="overflow-x-auto w-full capitalize h-[50vh] scroll-bar">
                    <table className="table table-auto w-full">
                      <thead>
                        <tr>
                          <th className="font-bold text-sm uppercase">
                            Código
                          </th>
                          <th className="font-bold text-sm uppercase">
                            Detalle
                          </th>
                          <th className="font-bold text-sm uppercase">
                            Categoria
                          </th>
                          <th className="font-bold text-sm uppercase">Tipo</th>
                          <th className="font-bold text-sm uppercase">Color</th>
                          <th className="font-bold text-sm uppercase">
                            Stock/Fabrica
                          </th>
                          <th className="font-bold text-sm uppercase">
                            Cantidad
                          </th>
                          <th className="font-bold text-sm uppercase">
                            Acción
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredVentas.map((producto, index) => (
                          <tr key={index}>
                            <th className="text-sm">{producto.codigo}</th>
                            <th className="text-sm uppercase">
                              {producto.detalle}
                            </th>
                            <th className="text-sm uppercase">
                              {producto.categoria}
                            </th>
                            <th className="text-sm uppercase">
                              {producto.tipo}
                            </th>
                            <th className="text-sm">{producto.color}</th>
                            <th className="text-sm ">
                              <span
                                className={`${
                                  producto.stock <= 0
                                    ? "text-white bg-primary py-2 px-2.5 rounded-xl shadow-xl"
                                    : "text-white bg-blue-500 py-2 px-2.5 rounded-xl shadow-xl"
                                }`}
                              >
                                {producto.stock}
                              </span>
                            </th>
                            <th>
                              <input
                                type="text"
                                placeholder="CANTIDAD PRODUCTS."
                                value={productoData[index]?.cantidad || ""}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "cantidad",
                                    e.target.value
                                  )
                                }
                                className="border border-gray-300 rounded-xl py-2 px-3 placeholder:font-bold placeholder:text-slate-400 text-gray-700 outline-none bg-white"
                              />
                            </th>

                            <td>
                              <button
                                className="bg-blue-700 text-white py-2 px-6 rounded-full font-semibold"
                                onClick={() =>
                                  handleAddProducto(index, producto)
                                }
                              >
                                Agregar
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
