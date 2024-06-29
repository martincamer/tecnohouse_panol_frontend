import React, { useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useForm } from "react-hook-form";
import { useSalidasCajon } from "../../context/CajonSalidasContext";

dayjs.extend(utc);

export const ModalCrearNuevaSalidaCajon = ({ cajones }) => {
  const { register, handleSubmit } = useForm();
  const { createSalidaCajon } = useSalidasCajon();

  const [selectedCajon, setSelectedCajon] = useState(null); // Estado para almacenar el cajón seleccionado

  const onSubmit = async (formData) => {
    try {
      // Creamos el objeto de salida del cajón con todos los datos
      const salidaCajonData = {
        ...formData,
        date: dayjs.utc(formData.date).format(),
        cajon_seleccionado: selectedCajon, // Guardamos el objeto completo del cajón seleccionado
      };

      await createSalidaCajon(salidaCajonData);

      document.getElementById("modal_crear_salida_cajon").close();
    } catch (error) {
      console.error("Error creating salida de cajón:", error);
    }
  };

  console.log("asdasd", selectedCajon);

  return (
    <dialog id="modal_crear_salida_cajon" className="modal">
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

        <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="py-4">
              <h3 className="font-bold text-lg">
                Crear una nueva salida del cajón
              </h3>
              <p className="py-2">
                En esta sección podrás crear una nueva salida de los cajones.
              </p>

              <div className="font-bold text-sky-700 mt-4">
                Datos del armador
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col">
                  <label className="py-2 text-sm font-bold">
                    Nombre y apellido
                  </label>
                  <input
                    {...register("nombre_apellido")}
                    type="text"
                    required
                    className="border border-sky-700 rounded-xl py-2 px-2 text-sm outline-none"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="py-2 text-sm font-bold">
                    Zona y localidad del viaje
                  </label>
                  <input
                    {...register("zona_localidad")}
                    type="text"
                    required
                    className="border border-sky-700 rounded-xl py-2 px-2 text-sm outline-none"
                  />
                </div>
                <div></div>

                {/* Select para seleccionar el número del cajón */}
                <div className="flex flex-col mb-5">
                  <label className="py-2 text-sm font-bold">
                    Seleccionar el cajón por el numero
                  </label>
                  <select
                    {...register("numero_cajon")}
                    onChange={(e) => {
                      const cajonSeleccionado = cajones.find(
                        (cajon) => cajon.numero_cajon === e.target.value
                      );
                      setSelectedCajon(cajonSeleccionado);
                    }}
                    required
                    className="border border-sky-700 rounded-xl py-2 px-2 text-sm outline-none"
                  >
                    <option value="">Selecciona un número de cajón</option>
                    {cajones.map((cajon) => (
                      <option key={cajon._id} value={cajon.numero_cajon}>
                        {cajon.numero_cajon}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <p className="font-bold text-sky-700 mb-5">
                  Herramientas del cajon seleccionado
                </p>
                <table className="table">
                  <thead className="uppercase">
                    <tr>
                      <th>Nombre</th>
                      <th>Detalle</th>
                      <th>Cantidad</th>
                      <th>Marca</th>
                      <th>Código</th>
                    </tr>
                  </thead>
                  <tbody className="font-bold uppercase text-xs">
                    {selectedCajon?.herramientas?.map((herramienta) => (
                      <tr>
                        <td>{herramienta.nombre}</td>
                        <td>{herramienta.detalle}</td>
                        <td>{herramienta.cantidad}</td>
                        <td>{herramienta.marca}</td>
                        <td>{herramienta.codigo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <button
                type="submit"
                className="font-bold bg-green-500 py-2 px-4 rounded-full text-white text-sm mt-5"
              >
                Guardar la salida del cajón
              </button>
            </div>
          </div>
        </form>
      </div>
    </dialog>
  );
};
