import { useEffect, useState } from "react";
import { ModalCrearNuevoCajon } from "../components/herramientas/ModalCrearNuevoCajon";
import { useCajones } from "../context/CajonContext";
import { ModalEditarCajon } from "../components/herramientas/ModalEditarCajon";
import { useObtenerId } from "../helpers/obtenerId";
import { ModalObtenerHerramientas } from "../components/herramientas/ModalObtenerHerramientas";
import { ModalCrearNuevaSalidaCajon } from "../components/herramientas/ModalCrearNuevaSalidaCajon";
import { useSalidasCajon } from "../context/CajonSalidasContext";
import { updateFecha } from "../helpers/FechaUpdate";
import { ModalEditarEstado } from "../components/herramientas/ModalEditarEstado";
import { ModalObtenerDatosSalida } from "../components/herramientas/ModalObtenerDatosSalida";

export const PageHerramientas = () => {
  const { cajones, getCajones, deleteCajon } = useCajones();
  const [totalHerramientas, setTotalHerramientas] = useState({});
  const { getSalidasCajon, salidasCajon, deleteSalidaCajon } =
    useSalidasCajon();

  useEffect(() => {
    getCajones();
    getSalidasCajon();
  }, []);

  const { idObtenida, handleObtenerId } = useObtenerId();

  console.log(cajones);
  // Función para calcular la suma de cantidades de herramientas en cada cajón
  const calcularTotalHerramientas = () => {
    const totalHerramientasCalculado = {};

    cajones.forEach((cajon) => {
      let sumaCantidad = 0;
      cajon.herramientas.forEach((herramienta) => {
        sumaCantidad += parseInt(herramienta.cantidad);
      });
      totalHerramientasCalculado[cajon._id] = sumaCantidad;
    });

    setTotalHerramientas(totalHerramientasCalculado);
  };

  useEffect(() => {
    calcularTotalHerramientas();
  }, [cajones]);

  const salidaNew = salidasCajon.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <section className="w-full">
      <div className="bg-white rounded-xl py-5 px-5 my-5 mx-5">
        <div>
          <p className="font-bold text-sky-700 text-xl">
            Crear nuevos cajones, salidas, etc.
          </p>
        </div>
      </div>
      <div className="bg-white rounded-xl py-3 px-4 mt-10 mb-2 mx-5">
        <button
          onClick={() =>
            document.getElementById("modal_crear_nuevo_cajon").showModal()
          }
          className="font-semibold bg-sky-700 px-4 py-1 rounded-full text-white text-sm hover:bg-orange-500 transition-all ease-linear"
        >
          Crear nuevo cajon
        </button>
      </div>
      <div className="bg-white mx-5 my-5 rounded-xl py-5 px-5">
        <p className="font-bold text-orange-500">Tabla de cajones</p>
        <div>
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Numero del cajon</th>
                <th>Total de herramientas</th>
                <th>Acciones</th>
              </tr>
            </thead>
            {cajones.map((cajon) => (
              <tr key={cajon._id}>
                <th>{cajon.numero_cajon}</th>
                <th className="text-sky-700">{totalHerramientas[cajon._id]}</th>
                <td>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        handleObtenerId(cajon._id),
                          document
                            .getElementById("modal_editar_cajon")
                            .showModal();
                      }}
                      className="text-xs font-bold text-sky-500 bg-sky-100 py-1 px-3 rounded"
                    >
                      Editar el cajón
                    </button>
                    <button
                      onClick={() => {
                        handleObtenerId(cajon._id),
                          document
                            .getElementById("modal_ver_herramientas")
                            .showModal();
                      }}
                      className="text-xs font-bold text-green-500 bg-green-100 py-1 px-3 rounded"
                    >
                      Ver herramientas
                    </button>
                    <button
                      onClick={() => deleteCajon(cajon._id)}
                      className="text-xs font-bold text-red-500 bg-red-100 py-1 px-3 rounded"
                    >
                      Eliminar el cajón
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
      <div className="bg-white rounded-xl py-3 px-4 mt-10 mb-2 mx-5">
        <button
          onClick={() =>
            document.getElementById("modal_crear_salida_cajon").showModal()
          }
          className="font-semibold bg-orange-500 px-4 py-1 rounded-full text-white text-sm hover:bg-sky-700 transition-all ease-linear"
        >
          Crear nueva salida de cajónes
        </button>
      </div>
      <div className="bg-white mx-5 my-5 rounded-xl py-5 px-5">
        <p className="font-bold text-orange-500">
          Tabla de salidas de los cajones
        </p>
        <div>
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Armador</th>
                <th>Zona localidad</th>
                <th>Estado de la salida</th>
                <th>Fecha de la salida</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody className="capitalize">
              {salidaNew.map((cajon) => (
                <tr key={cajon._id}>
                  <th>{cajon.nombre_apellido}</th>
                  <th>{cajon.zona_localidad}</th>
                  <th>
                    <div className="flex">
                      <p
                        className={`${
                          (cajon.estado === "en viaje" &&
                            "bg-orange-100 text-orange-600") ||
                          (cajon.estado === "en fabrica" &&
                            "bg-green-100 text-green-600") ||
                          (cajon.estado === "perdido" &&
                            "bg-red-100 text-red-700")
                        } px-4 py-1 rounded text-xs`}
                      >
                        {" "}
                        {cajon.estado}
                      </p>
                    </div>
                  </th>
                  <th className="text-sky-700">{updateFecha(cajon.date)}</th>
                  <td>
                    <div className="flex gap-2">
                      {" "}
                      <button
                        onClick={() => {
                          handleObtenerId(cajon._id),
                            document
                              .getElementById("modal_ver_salida")
                              .showModal();
                        }}
                        className="text-xs font-bold text-sky-700 bg-sky-100 py-1 px-3 rounded"
                      >
                        Ver datos/herramientas/etc.
                      </button>
                      <button
                        onClick={() => {
                          handleObtenerId(cajon._id),
                            document
                              .getElementById("modal_editar_estado")
                              .showModal();
                        }}
                        className="text-xs font-bold text-green-700 bg-green-100 py-1 px-3 rounded"
                      >
                        Actualizar el estado
                      </button>
                      <button
                        onClick={() => deleteSalidaCajon(cajon._id)}
                        className="text-xs font-bold text-red-500 bg-red-100 py-1 px-3 rounded"
                      >
                        Eliminar la salida
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ModalCrearNuevoCajon />
      <ModalEditarCajon idObtenida={idObtenida} />
      <ModalObtenerHerramientas idObtenida={idObtenida} />
      <ModalCrearNuevaSalidaCajon cajones={cajones} />
      <ModalEditarEstado idObtenida={idObtenida} />
      <ModalObtenerDatosSalida idObtenida={idObtenida} />
    </section>
  );
};
