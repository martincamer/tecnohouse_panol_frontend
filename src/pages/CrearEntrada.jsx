import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useVentas } from "../context/VentasContext"; // Cambia al contexto de ventas
import { useEffect, useState } from "react";
import { useModal } from "../helpers/modal";
import { toast } from "react-toastify";
import ModalClientes from "../components/ventas/ModalClientes";
import ModalProductos from "../components/ventas/ModalProductos.jsx";
import dayjs from "dayjs";

export function CrearEntrada() {
  const [clienteSeleccionado, setClienteSeleccionado] = useState([]);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);

  const { isOpen, openModal, closeModal } = useModal();
  const {
    isOpen: isOpenProducto,
    openModal: openProducto,
    closeModal: closeProducto,
  } = useModal();

  const { createEntrada, getVentas } = useVentas(); // Cambia al método para crear venta
  const navigate = useNavigate(); // Para redirigir después de crear

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm(); // Uso de React Hook Form para validación

  //   useEffect(() => {
  //     getVentas(); // Obtiene ventas si es necesario al montar el componente
  //   }, []);

  const onSubmit = async (formData) => {
    try {
      const ventaData = {
        ...formData,
        productos: productosSeleccionados,
        date: dayjs.utc(formData.date).format(),
      };

      await createEntrada(ventaData); // Crea la nueva venta con el formulario

      toast.success("Creado correctamente", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        style: {
          padding: "10px",
          borderRadius: "15px",
        },
        // transition: "Bounce",
      });

      setTimeout(() => {
        navigate("/registros"); // Redirige a la lista de ventas después de la creación
      }, 3000);
    } catch (error) {
      console.error("Error creando venta:", error);
    }
  };

  const addToCliente = (id, nombre, apellido, fabrica, zona) => {
    const nuevoCliente = {
      id,
      nombre,
      apellido,
      fabrica,
      zona,
    };

    setClienteSeleccionado(...clienteSeleccionado, nuevoCliente);
  };

  const handleResetCliente = () => {
    setClienteSeleccionado([]);
  };

  const addToProducto = (
    ObjectId,
    id,
    codigo,
    detalle,
    imagen,
    color,
    categoria,
    tipo,
    cantidad,
    date
  ) => {
    const nuevoProducto = {
      ObjectId,
      id,
      codigo,
      detalle,
      imagen,
      color,
      categoria,
      tipo,
      cantidad,
      date,
    };

    setProductosSeleccionados([...productosSeleccionados, nuevoProducto]);

    closeProducto();
  };

  // Estado para controlar qué fila está en modo de edición
  const [editIndex, setEditIndex] = useState(null);

  const handleEditToggle = (index) => {
    if (editIndex === index) {
      // Si ya estamos en modo de edición para esta fila, cancelar la edición
      setEditIndex(null);
    } else {
      // De lo contrario, establecer el modo de edición para esta fila
      setEditIndex(index);
    }
  };

  const handleInputChange = (index, field, value) => {
    const nuevosProductos = [...productosSeleccionados];
    nuevosProductos[index][field] = value;
    setProductosSeleccionados(nuevosProductos);
  };

  return (
    <section>
      <div className="bg-white w-full flex justify-between items-center">
        <div className="flex">
          <Link
            to={"/registros"}
            className="px-8 text-base py-4 text-gray-700 font-medium hover:text-sky-700 transition-all"
          >
            Registros
          </Link>
          <Link
            to={"/crear-entrada"}
            className="bg-sky-100 px-8 text-base py-4 text-sky-600 font-medium hover:bg-gray-100 transition-all"
          >
            Crear nueva entrada
          </Link>
        </div>
        <div className="flex mx-9">
          <div className="text-sm breadcrumbs">
            <ul>
              <li>
                <Link
                  className="bg-gray-100 text-gray-700 py-2 px-4 rounded-xl cursor-pointer font-bold"
                  to={"/home"}
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  className="bg-sky-100 text-sky-700 py-2 px-4 rounded-xl cursor-pointer font-bold"
                  to={"/registros"}
                >
                  Registros
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Formulario para crear una nueva venta */}
      <div className="mx-10 flex justify-start items-start gap-8">
        <div className="w-3/4">
          <div className="flex flex-col gap-1">
            <p className="font-bold text-slate-700 mt-10 text-xl">
              Crear nueva entrada de productos
            </p>
            <p className="text-slate-600 font-semibold text-sm">
              En esta sección podrás crear nuevas entradas de tus productos.
            </p>
          </div>

          <div className="bg-white my-5 rounded-xl shadow-lg flex flex-col gap-3">
            <div className="bg-gray-100 py-4 rounded-t-xl">
              <p className="text-sky-500 text-center text-base font-bold">
                Formulario
              </p>
            </div>
            <div className="px-10 py-8 flex flex-col gap-5">
              <form
                onSubmit={handleSubmit(onSubmit)} // Maneja el envío del formulario
                className="flex flex-col gap-6"
              >
                <div className="grid grid-cols-3 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-700">
                      Proveedor
                    </label>
                    <input
                      {...register("proveedor_factura")}
                      type="text"
                      placeholder="Ej: Mecan"
                      className="text-sm uppercase text-slate-700 bg-gray-100 rounded-lg py-3 px-3 outline-none ease-linear transition-all focus:outline-sky-500 outline-1 font-bold"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-700">
                      Numero de la factura
                    </label>
                    <input
                      {...register("numero_factura")}
                      type="text"
                      placeholder="0000-5512"
                      className="text-sm uppercase text-slate-700 bg-gray-100 rounded-lg py-3 px-3 outline-none ease-linear transition-all focus:outline-sky-500 outline-1 font-bold"
                    />
                  </div>
                </div>

                <div className="flex flex-col items-start gap-2">
                  <p className="font-bold text-slate-700 uppercase text-sm">
                    Seleccionar los productos de la entrada/acordate que lo
                    sumara al stock al crear la entrada
                  </p>
                  <button
                    onClick={() => openProducto()}
                    className="bg-sky-700 text-white hover:bg-sky-700/90 rounded-full py-3 px-8 text-sm font-semibold"
                    type="button"
                  >
                    Seleccionar los productos de la entrada
                  </button>
                </div>
                <div className="w-full scroll-bar overflow-x-scroll">
                  <table className="table uppercase">
                    {/* head */}
                    <thead>
                      <tr>
                        <th className="text-slate-500 text-sm uppercase">
                          Código
                        </th>
                        <th className="text-slate-500 text-sm uppercase">
                          Detalle
                        </th>
                        <th className="text-slate-500 text-sm uppercase">
                          Color
                        </th>
                        <th className="text-slate-500 text-sm uppercase">
                          Categoría
                        </th>
                        <th className="text-slate-500 text-sm uppercase">
                          Tipo
                        </th>
                        <th className="text-slate-500 text-sm uppercase">
                          Cantidad
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {productosSeleccionados.map((producto, index) => (
                        <tr key={index}>
                          <td className="font-semibold text-gray-700">
                            {producto.codigo}
                          </td>
                          <td className="font-semibold text-gray-700">
                            {producto.detalle}
                          </td>
                          <td className="font-semibold text-gray-700">
                            {producto.color}
                          </td>
                          <td className="font-semibold text-gray-700">
                            {producto.categoria}
                          </td>
                          <td className="font-semibold text-gray-700">
                            {producto.tipo}
                          </td>
                          <td className="font-semibold text-gray-700">
                            {editIndex === index ? (
                              <input
                                type="number"
                                className="p-2 rounded w-full bg-gray-200/80 text-gray-700 border-none outline-none"
                                value={producto.cantidad}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "cantidad",
                                    parseFloat(e.target.value)
                                  )
                                }
                              />
                            ) : (
                              producto.cantidad
                            )}
                          </td>

                          <td>
                            <div className="flex gap-2">
                              {/* Botón para alternar entre edición y no edición */}
                              <button
                                type="button"
                                onClick={() => handleEditToggle(index)}
                                className="bg-sky-700 py-2 px-6 text-white rounded-full font-bold"
                              >
                                {editIndex === index ? "Guardar" : "Editar"}
                              </button>

                              {/* Botón para eliminar el producto */}
                              <button
                                type="button"
                                onClick={() => {
                                  setProductosSeleccionados((prev) =>
                                    prev.filter((_, i) => i !== index)
                                  );
                                }}
                                className="bg-orange-600/90 py-2 px-6 rounded-full font-bold text-white"
                              >
                                Eliminar
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div>
                  <button
                    type="submit"
                    className="bg-green-500 py-2.5 px-6 text-sm rounded-full font-semibold text-white mt-3 hover:bg-green-600/90 cursor-pointer"
                  >
                    Generar de los productos
                  </button>
                </div>
              </form>
            </div>
          </div>
          {productosSeleccionados?.length === 0 ? (
            ""
          ) : (
            <div className="my-10 ">
              <div className="mb-3">
                <p className="text-gray-700 font-semibold text-lg">
                  Productos seleccionados 🖐️
                </p>
                <p className="font-normal text-sm">
                  Mira por los productos seleccionados
                </p>
              </div>
              <div className="bg-white py-5 px-5 rounded-xl shadow-xl grid grid-cols-4 justify-center items-center gap-2">
                {productosSeleccionados.map((p) => (
                  <div className="border py-4 px-2 rounded-xl flex flex-col gap-2 justify-center items-center h-full">
                    <img
                      className="w-[120px] object-cover"
                      src={p.imagen}
                      alt="imagen"
                    />
                    <div className="h-[5vh] overflow-y-scroll scroll-bar w-full">
                      <div className="w-full px-2">
                        <p className="text-sm font-bold text-gray-700 uppercase">
                          {" "}
                          Codigo:{" "}
                          <span className="font-bold text-sky-700">
                            {p.codigo}
                          </span>
                        </p>
                      </div>
                      <div className="w-full px-2">
                        <p className="text-sm font-bold text-gray-700 uppercase">
                          {" "}
                          Detalle:{" "}
                          <span className="font-bold text-sky-700">
                            {p.detalle}
                          </span>
                        </p>
                      </div>
                      <div className="w-full px-2">
                        <p className="text-sm font-bold text-gray-700 uppercase">
                          {" "}
                          Color:{" "}
                          <span className="font-bold text-sky-700">
                            {p.color}
                          </span>
                        </p>
                      </div>
                      <div className="w-full px-2">
                        <p className="text-sm font-bold text-gray-700 uppercase">
                          {" "}
                          Categoria:{" "}
                          <span className="font-bold text-sky-700">
                            {p.categoria}
                          </span>
                        </p>
                      </div>
                      <div className="w-full px-2">
                        <p className="text-sm font-bold text-gray-700 uppercase">
                          {" "}
                          Tipo:{" "}
                          <span className="font-bold text-sky-700">
                            {p.tipo}
                          </span>
                        </p>
                      </div>
                      <div className="w-full px-2">
                        <p className="text-sm font-bold text-gray-700 uppercase">
                          {" "}
                          Cantidad:{" "}
                          <span className="font-bold text-sky-700">
                            {p.cantidad}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <ModalClientes
        addToCliente={addToCliente}
        isOpen={isOpen}
        closeModal={closeModal}
      />
      <ModalProductos
        addToProducto={addToProducto}
        isOpen={isOpenProducto}
        closeModal={closeProducto}
      />
    </section>
  );
}
