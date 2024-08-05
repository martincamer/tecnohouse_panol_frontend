import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useVentas } from "../context/VentasContext"; // Cambia al contexto de ventas
import { useEffect, useState } from "react";
import { useModal } from "../helpers/modal";
import { toast } from "react-toastify";
import ModalClientes from "../components/ventas/ModalClientes";
import ModalProductos from "../components/ventas/ModalProductos.jsx";
import dayjs from "dayjs";
import { FaArrowLeft } from "react-icons/fa";

export function CrearVenta() {
  const [clienteSeleccionado, setClienteSeleccionado] = useState([]);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);

  console.log(productosSeleccionados);

  const { isOpen, openModal, closeModal } = useModal();
  const {
    isOpen: isOpenProducto,
    openModal: openProducto,
    closeModal: closeProducto,
  } = useModal();

  const { createVenta, getVentas } = useVentas(); // Cambia al método para crear venta
  const navigate = useNavigate(); // Para redirigir después de crear

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm(); // Uso de React Hook Form para validación

  useEffect(() => {
    getVentas(); // Obtiene ventas si es necesario al montar el componente
  }, []);

  const onSubmit = async (formData) => {
    try {
      const ventaData = {
        ...formData,
        cliente: clienteSeleccionado,
        productos: productosSeleccionados,
        date: dayjs.utc(formData.date).format(),
      };

      await createVenta(ventaData); // Crea la nueva venta con el formulario

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
      <div className="bg-white w-full flex justify-between items-center ">
        <div className="flex border-b w-full border-gray-300">
          <Link
            to={"/registros"}
            className="bg-gray-100/50 px-8 text-base py-4 text-gray-700 font-medium hover:text-primary transition-all flex items-center gap-3"
          >
            <FaArrowLeft className="" /> Registros
          </Link>
          <Link
            to={"/crear-salida"}
            className="bg-primary/10 px-8 text-base py-4 text-primary font-bold hover:bg-gray-100 transition-all"
          >
            Crear nueva salida
          </Link>
        </div>
      </div>

      {/* Formulario para crear una nueva venta */}
      <div className="mx-10 flex justify-start items-start gap-8">
        <div className="w-3/4">
          <div className="flex flex-col gap-1">
            <p className="font-bold text-slate-700 mt-10 text-xl">
              Crear nueva salida de productos
            </p>
            <p className="text-slate-600 font-semibold text-sm">
              En esta sección podrás crear nuevas salidas de productos.
            </p>
          </div>

          <div className="bg-white my-5 rounded-xl shadow-lg flex flex-col gap-0">
            <div className="bg-gray-800 py-4 rounded-t-md">
              <p className="text-white text-center text-base font-bold">
                Formulario para cargar nueva salida.
              </p>
            </div>
            <div className="px-10 py-8 flex flex-col gap-5  border-b border-l border-r rounded-b-md border-gray-300">
              <form
                onSubmit={handleSubmit(onSubmit)} // Maneja el envío del formulario
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col items-start gap-2">
                  <p className="font-bold text-slate-700 uppercase text-sm">
                    Seleccionar el empleado de la salida
                  </p>
                  <button
                    onClick={() => openModal()}
                    className="bg-primary text-white hover:shadow-md rounded-md py-3 px-8 text-sm font-semibold"
                    type="button"
                  >
                    Seleccionar empleado
                  </button>
                </div>

                <div className="overflow-x-auto w-full">
                  <table className="table">
                    {/* head */}
                    <thead>
                      <tr>
                        <th className="text-gray-800 text-sm">Nombre</th>
                        <th className="text-gray-800 text-sm">Apellido</th>
                        <th className="text-gray-800 text-sm">Fabrica</th>{" "}
                        <th className="text-gray-800 text-sm">Zona</th>{" "}
                      </tr>
                    </thead>
                    <tbody className="text-xs">
                      <tr>
                        <td className="uppercase">
                          {clienteSeleccionado.nombre}
                        </td>
                        <td className="uppercase">
                          {clienteSeleccionado.apellido}
                        </td>
                        <th className="uppercase">
                          {clienteSeleccionado.fabrica}
                        </th>
                        <th className="uppercase">
                          {clienteSeleccionado.zona}
                        </th>
                        <td>
                          <button
                            type="button"
                            onClick={() => {
                              handleResetCliente();
                            }}
                            className="bg-rose-500 py-2 px-6 rounded-md text-white font-semibold"
                          >
                            Resetear
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex flex-col items-start gap-2">
                  <p className="font-bold text-slate-700 uppercase text-sm">
                    Seleccionar los productos de la salida/acordate que al
                    generar descuenta el stock.
                  </p>
                  <button
                    onClick={() => openProducto()}
                    className="bg-blue-500 text-white hover:shadow-md rounded-md py-3 px-8 text-sm font-semibold"
                    type="button"
                  >
                    Seleccionar los productos de la salida
                  </button>
                </div>
                <div className="w-full scroll-bar overflow-x-scroll">
                  <table className="table uppercase">
                    {/* head */}
                    <thead>
                      <tr>
                        <th className="text-gray-800 text-sm">Código</th>
                        <th className="text-gray-800 text-sm">Detalle</th>
                        <th className="text-gray-800 text-sm">Color</th>
                        <th className="text-gray-800 text-sm">Categoría</th>
                        <th className="text-gray-800 text-sm">Tipo</th>
                        <th className="text-gray-800 text-sm">Cantidad</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs">
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
                                className="bg-blue-500 py-2 px-6 text-white rounded-md font-bold"
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
                                className="bg-primary py-2 px-6 rounded-md font-bold text-white"
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

                <div className="flex flex-col gap-2 mt-5">
                  <label className="text-sm font-bold text-slate-700">
                    Nota / Detalles de la salida
                  </label>
                  <textarea
                    {...register("nota")}
                    type="text"
                    placeholder="Nota / detalle de la salida de herramientas etc. No obligatorio"
                    className={
                      "text-sm border border-gray-300 py-2 px-3 rounded-md outline-none focus:shadow cursor-pointer font-semibold uppercase"
                    }
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="bg-green-500 py-2.5 px-6 text-sm rounded-md font-semibold text-white mt-3 hover:bg-green-600/90 cursor-pointer"
                  >
                    Generar salida de los productos...
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
              <div className="bg-white py-5 px-5 rounded-xl border-gray-300 border shadow-xl grid grid-cols-4 justify-center items-center gap-2">
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
                          <span className="font-bold text-blue-500">
                            {p.codigo}
                          </span>
                        </p>
                      </div>
                      <div className="w-full px-2">
                        <p className="text-sm font-bold text-gray-700 uppercase">
                          {" "}
                          Detalle:{" "}
                          <span className="font-bold text-blue-500">
                            {p.detalle}
                          </span>
                        </p>
                      </div>
                      <div className="w-full px-2">
                        <p className="text-sm font-bold text-gray-700 uppercase">
                          {" "}
                          Color:{" "}
                          <span className="font-bold text-blue-500">
                            {p.color}
                          </span>
                        </p>
                      </div>
                      <div className="w-full px-2">
                        <p className="text-sm font-bold text-gray-700 uppercase">
                          {" "}
                          Categoria:{" "}
                          <span className="font-bold text-blue-500">
                            {p.categoria}
                          </span>
                        </p>
                      </div>
                      <div className="w-full px-2">
                        <p className="text-sm font-bold text-gray-700 uppercase">
                          {" "}
                          Tipo:{" "}
                          <span className="font-bold text-blue-500">
                            {p.tipo}
                          </span>
                        </p>
                      </div>
                      <div className="w-full px-2">
                        <p className="text-sm font-bold text-gray-700 uppercase">
                          {" "}
                          Cantidad:{" "}
                          <span className="font-bold text-blue-500">
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
