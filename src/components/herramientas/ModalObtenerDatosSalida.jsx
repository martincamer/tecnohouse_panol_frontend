import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useSalidasCajon } from "../../context/CajonSalidasContext";
import { updateFecha } from "../../helpers/FechaUpdate";

dayjs.extend(utc);

export const ModalObtenerDatosSalida = ({ idObtenida }) => {
  const [salida, setSalida] = useState([]);
  const { getSalidaCajon } = useSalidasCajon();

  useEffect(() => {
    const loadCajon = async () => {
      if (idObtenida) {
        const salida = await getSalidaCajon(idObtenida);
        setSalida(salida);
      }
    };
    loadCajon();
  }, [idObtenida]);

  console.log(salida);

  return (
    <dialog id="modal_ver_salida" className="modal">
      <div className="modal-box max-w-4xl">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        {/* Formulario para crear una nueva herramienta */}
        <div className="py-4">
          <h3 className="font-bold text-lg">Ver la salida del cajón</h3>
          <p className="py-1">
            En esta sección podrás ver las herramientas del cajón, datos, etc.
          </p>
        </div>

        <div>
          <h3 className="text-sky-700 font-semibold">
            Datos de la salida del cajón
          </h3>
          <div>
            <p className="text-sky-700 font-medium">
              Armador:{" "}
              <span className="capitalize font-bold text-gray-800">
                {salida?.nombre_apellido}
              </span>{" "}
            </p>
            <p className="text-sky-700 font-medium">
              Fecha de la salida?:{" "}
              <span className="capitalize font-bold text-gray-800">
                {updateFecha(salida?.date)}
              </span>{" "}
            </p>
            <p className="text-sky-700 font-medium">
              Zona/Localidad:{" "}
              <span className="capitalize font-bold text-gray-800">
                {salida?.zona_localidad}
              </span>{" "}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-sky-700 font-semibold">
            Tabla de herramientas/salida
          </h3>
        </div>
        <table className="table table-compact table-striped uppercase text-xs">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Detalle</th>
              <th>Cantidad</th>
              <th>Marca</th>
              <th>Código</th>
            </tr>
          </thead>
          <tbody className="font-bold">
            {salida &&
              salida?.cajon_seleccionado &&
              salida?.cajon_seleccionado[0] &&
              salida?.cajon_seleccionado[0]?.herramientas &&
              salida?.cajon_seleccionado[0]?.herramientas.map(
                (herramienta, index) => (
                  <tr key={index}>
                    <td>{herramienta?.nombre}</td>
                    <td>{herramienta?.detalle}</td>
                    <td>{herramienta?.cantidad}</td>
                    <td>{herramienta?.marca}</td>
                    <td>{herramienta?.codigo}</td>
                  </tr>
                )
              )}
          </tbody>
        </table>
      </div>
    </dialog>
  );
};
