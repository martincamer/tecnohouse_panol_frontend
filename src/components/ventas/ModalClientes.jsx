import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoMdClose } from "react-icons/io"; // Iconos de alerta y cerrar
import { useClientes } from "../../context/ClientesContext";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function ModalClientes({
  isOpen, // Estado para indicar si el modal está abierto
  closeModal, // Función para cerrar el modal
  addToCliente,
}) {
  const { clientes, getClientes } = useClientes();

  const [searchTerm, setSearchTerm] = useState(""); // Para la búsqueda

  // Cambiar la página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Manejar búsqueda
  const handleSearch = (event) => {
    setSearchTerm(event.target.value); // Actualizar el término de búsqueda
  };

  // Filtrar ventas por el término de búsqueda
  const filteredVentas = clientes.filter(
    (venta) =>
      venta?.nombre?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      venta?.apellido?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  useEffect(() => {
    getClientes();
  }, []);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as="div"
          enter="transition-opacity"
          enterFrom="opacity-0"
          enterTo="opacity-100"
        >
          <div className="fixed inset-0 bg-black/10" /> {/* Fondo oscuro */}
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-6xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-end py-2">
                  <IoMdClose
                    onClick={closeModal} // Cierra el modal al hacer clic
                    className="hover:text-sky-700 hover:bg-gray-100 transition-all cursor-pointer text-4xl text-slate-800 bg-gray-200 py-2 px-2 rounded-full"
                  />
                </div>

                <div className="flex justify-center flex-col gap-4 items-center">
                  <div>
                    <p className="font-semibold text-slate-700">
                      Seleccionar el empleado de la salida
                    </p>
                  </div>

                  <div className="w-full">
                    {" "}
                    <input
                      type="text"
                      placeholder="Buscar empleado por el nombre o apellido..."
                      value={searchTerm}
                      onChange={handleSearch}
                      className="px-4 py-2.5 ml-3 rounded-full shadow-lg outline-none focus:ring-sky-500 focus:border-sky-500 font-bold text-sm w-[400px] border"
                    />
                  </div>

                  <div className="overflow-x-auto w-full capitalize h-[40vh] scroll-bar px-2">
                    <table className="table">
                      {/* head */}
                      <thead>
                        <tr>
                          <th className="text-slate-500 text-sm uppercase">
                            Nombre
                          </th>
                          <th className="text-slate-500 text-sm uppercase">
                            Apellido
                          </th>
                          <th className="text-slate-500 text-sm uppercase">
                            Fabrica
                          </th>{" "}
                          <th className="text-slate-500 text-sm uppercase">
                            Zona/Sector
                          </th>
                        </tr>
                      </thead>
                      <tbody className="uppercase">
                        {filteredVentas.map((c) => (
                          <tr>
                            <th>{c.nombre}</th>
                            <th>{c.apellido}</th>
                            <th>{c.fabrica}</th>
                            <th>{c.zona}</th>
                            <td>
                              <button
                                onClick={() => {
                                  {
                                    addToCliente(
                                      c._id,
                                      c.nombre,
                                      c.apellido,
                                      c.fabrica,
                                      c.zona
                                    ),
                                      closeModal();
                                  }
                                }}
                                className="bg-sky-700 py-2 px-6 rounded-full text-white font-semibold"
                              >
                                Seleccionar este empleado
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
