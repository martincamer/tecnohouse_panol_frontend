import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useForm } from "react-hook-form";
import { useCajones } from "../../context/CajonContext";

dayjs.extend(utc);

export const ModalEditarCajon = ({ idObtenida }) => {
  const { register, handleSubmit, setValue } = useForm();
  const { updateCajon, getCajon } = useCajones();

  // Estado local para almacenar las herramientas
  const [herramientas, setHerramientas] = useState([]);

  useEffect(() => {
    const loadCajon = async () => {
      if (idObtenida) {
        const cajon = await getCajon(idObtenida);

        setValue("numero_cajon", cajon?.numero_cajon);
        setHerramientas(cajon?.herramientas);
      }
    };
    loadCajon();
  }, [idObtenida]);

  // Estado local para el formulario de nueva herramienta
  const [nuevaHerramienta, setNuevaHerramienta] = useState({
    nombre: "",
    detalle: "",
    cantidad: "",
    marca: "",
    codigo: "",
  });

  const onSubmit = async (formData) => {
    try {
      // Creamos el objeto del producto con todos los datos y la URL de la imagen
      const cajonData = {
        ...formData,
        date: dayjs.utc(formData.date).format(),
        herramientas: herramientas, // Añadimos la URL de la imagen
      };

      await updateCajon(idObtenida, cajonData);

      document.getElementById("modal_editar_cajon").close();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  // Estado local para editar herramienta
  const [editandoIndex, setEditandoIndex] = useState(-1);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaHerramienta({ ...nuevaHerramienta, [name]: value });
  };

  // Manejar envío del formulario para agregar una nueva herramienta
  const handleSubmitHerramientas = (e) => {
    e.preventDefault();
    // Validar que los campos requeridos estén completos antes de agregar la herramienta
    if (
      nuevaHerramienta.nombre &&
      nuevaHerramienta.detalle &&
      nuevaHerramienta.cantidad
    ) {
      if (editandoIndex === -1) {
        // Agregar la nueva herramienta al estado de herramientas
        setHerramientas([...herramientas, nuevaHerramienta]);
      } else {
        // Actualizar la herramienta existente
        const nuevasHerramientas = [...herramientas];
        nuevasHerramientas[editandoIndex] = nuevaHerramienta;
        setHerramientas(nuevasHerramientas);
        setEditandoIndex(-1); // Terminar modo edición
      }
      // Limpiar el formulario para la próxima entrada
      setNuevaHerramienta({
        nombre: "",
        detalle: "",
        cantidad: "",
        marca: "",
        codigo: "",
      });
    } else {
      alert(
        "Por favor completa los campos obligatorios: nombre, detalle y cantidad."
      );
    }
  };

  // Función para editar una herramienta
  const editarHerramienta = (index) => {
    const herramientaSeleccionada = herramientas[index];
    setNuevaHerramienta({ ...herramientaSeleccionada });
    setEditandoIndex(index);
  };

  // Función para eliminar una herramienta
  const eliminarHerramienta = (index) => {
    const nuevasHerramientas = [...herramientas];
    nuevasHerramientas.splice(index, 1);
    setHerramientas(nuevasHerramientas);
  };

  return (
    <dialog id="modal_editar_cajon" className="modal">
      <div className="modal-box max-w-6xl">
        <form method="dialog">
          {/* Botón para cerrar el modal */}
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>

        {/* Formulario para crear una nueva herramienta */}
        <div>
          <div className="py-4">
            <h3 className="font-bold text-lg">Crear un nuevo cajón</h3>
            <p className="py-2">En esta sección podrás crear un nuevo cajón.</p>

            <div className="font-bold text-sky-700 mt-4">Datos del cajon</div>
            <div className="flex flex-col w-1/6">
              <label className="py-2 text-sm font-bold">
                Numero del cajón *
              </label>
              <input
                {...register("numero_cajon")}
                type="text"
                required
                className="border border-sky-700 rounded-xl py-2 px-2 text-sm outline-none"
              />
            </div>

            <div className="font-bold text-sky-700 mt-4">
              Crear nuevas herramientas
            </div>
            <form onSubmit={handleSubmitHerramientas}>
              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col">
                  <label className="py-2 text-sm font-bold">Nombre *</label>
                  <input
                    type="text"
                    name="nombre"
                    value={nuevaHerramienta?.nombre}
                    onChange={handleChange}
                    required
                    className="border border-sky-700 rounded-xl py-2 px-2 text-sm outline-none"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="py-2 text-sm font-bold">Detalle *</label>
                  <input
                    type="text"
                    name="detalle"
                    value={nuevaHerramienta?.detalle}
                    onChange={handleChange}
                    required
                    className="border border-sky-700 rounded-xl py-2 px-2 text-sm outline-none"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="py-2 text-sm font-bold">Cantidad *</label>
                  <input
                    type="number"
                    name="cantidad"
                    value={nuevaHerramienta?.cantidad}
                    onChange={handleChange}
                    required
                    className="border border-sky-700 rounded-xl py-2 px-2 text-sm outline-none"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="py-2 text-sm font-bold">Marca</label>
                  <input
                    type="text"
                    name="marca"
                    value={nuevaHerramienta?.marca}
                    onChange={handleChange}
                    className="border border-sky-700 rounded-xl py-2 px-2 text-sm outline-none"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="py-2 text-sm font-bold">Código</label>
                  <input
                    type="text"
                    name="codigo"
                    value={nuevaHerramienta?.codigo}
                    onChange={handleChange}
                    className="border border-sky-700 rounded-xl py-2 px-2 text-sm outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-sky-700 text-white font-semibold text-sm px-5 py-2 rounded-full hover:shadow-md transition-all mt-4"
              >
                {editandoIndex === -1
                  ? "Agregar Herramienta"
                  : "Guardar Cambios"}
              </button>
            </form>
          </div>

          {/* Tabla para mostrar las herramientas */}
          <div>
            {herramientas?.length > 0 && (
              <table className="table table-compact table-striped uppercase text-xs">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Detalle</th>
                    <th>Cantidad</th>
                    <th>Marca</th>
                    <th>Código</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {herramientas?.map((herramienta, index) => (
                    <tr key={index}>
                      <td>{herramienta?.nombre}</td>
                      <td>{herramienta?.detalle}</td>
                      <td>{herramienta?.cantidad}</td>
                      <td>{herramienta?.marca}</td>
                      <td>{herramienta?.codigo}</td>
                      <td>
                        <button
                          type="button"
                          className="bg-sky-700 text-white px-3 py-1 rounded-full mr-2"
                          onClick={() => editarHerramienta(index)}
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          className="bg-red-500 text-white px-3 py-1 rounded-full"
                          onClick={() => eliminarHerramienta(index)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <button
                type="submit"
                className="font-bold bg-green-500 py-2 px-4 rounded-full text-white text-sm"
              >
                Actualizar el cajon
              </button>
            </form>
          </div>
        </div>
      </div>
    </dialog>
  );
};
