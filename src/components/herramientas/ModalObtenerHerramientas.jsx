import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useCajones } from "../../context/CajonContext";

dayjs.extend(utc);

export const ModalObtenerHerramientas = ({ idObtenida }) => {
  const [herramiemtas, setHerramientas] = useState([]);
  const { getCajon } = useCajones();

  useEffect(() => {
    const loadCajon = async () => {
      if (idObtenida) {
        const cajon = await getCajon(idObtenida);
        setHerramientas(cajon);
        console.log("cajon", cajon);
      }
    };
    loadCajon();
  }, [idObtenida]);

  return (
    <dialog id="modal_ver_herramientas" className="modal">
      <div className="modal-box max-w-6xl">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        {/* Formulario para crear una nueva herramienta */}
        <div className="py-4">
          <h3 className="font-bold text-lg">Herramientas del cajón</h3>
          <p className="py-2">
            En esta sección podrás ver las herramientas del cajón.
          </p>
        </div>
        {/* Tabla para mostrar las herramientas */}
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
            {herramiemtas?.herramientas?.map((herramienta, index) => (
              <tr key={index}>
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
    </dialog>
  );
};
