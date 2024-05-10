import { useEffect } from "react";
import { useVentas } from "../context/VentasContext.jsx"; // Cambia a VentasContext
import { ImFileEmpty } from "react-icons/im"; // Icono para cuando no hay datos
import { BsFolderPlus } from "react-icons/bs"; // Icono para agregar
import { TableVentas } from "../components/ventas/TableVentas.jsx"; // Cambia a la tabla de ventas
import { IoIosAddCircleOutline } from "react-icons/io"; // Icono para agregar
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

export function VentasPage() {
  const { ventas, getVentas, getEntradas, entradas } = useVentas(); // Cambia a ventas y función para obtener ventas

  useEffect(() => {
    getVentas(); // Obtiene las ventas cuando el componente se monta
    getEntradas();
  }, []); // No olvides agregar dependencias necesarias para evitar advertencias

  return (
    <div>
      <div className="bg-white w-full flex justify-between items-center ">
        <div className="flex">
          <p className="bg-sky-100/80 px-8 text-[16px] py-4 text-sky-600 font-semibold">
            Registros
          </p>
        </div>
        <div className="mx-5 z-[0] flex gap-2">
          <button className="text-sm font-semibold bg-green-500/90 py-2 px-5 rounded-2xl text-white group flex gap-3 items-center relative transition-all ease-linear duration-300 z-0">
            <Link
              to={"/crear-salida"}
              className="transition-opacity duration-300 opacity-100 group-hover:opacity-0"
            >
              Crear nueva salida
            </Link>

            <IoIosAddCircleOutline className="text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute left-0 right-0 top-0 bottom-0 m-auto" />
          </button>

          <button className="text-sm font-semibold bg-green-500/90 py-2 px-5 rounded-2xl text-white group flex gap-3 items-center relative transition-all ease-linear duration-300 z-0">
            <Link
              to={"/crear-entrada"}
              className="transition-opacity duration-300 opacity-100 group-hover:opacity-0"
            >
              Crear nueva entrada
            </Link>

            <IoIosAddCircleOutline className="text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute left-0 right-0 top-0 bottom-0 m-auto" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-5 mx-10">
        <section className="py-10 grid grid-cols-3 gap-4">
          <div className="stats shadow-xl items-center">
            <div className="stat">
              <div className="stat-title font-semibold">
                Generado en salidas del mes
              </div>
              <div className="stat-value text-green-500">{ventas.length}</div>
              <div className="stat-desc font-bold text-green-500 mt-1">
                ↗︎ {Number(ventas.length % 100).toFixed(2)}%
              </div>
            </div>

            <div>
              <div className="py-5 px-5 w-32 font-bold mx-auto">
                <CircularProgressbar
                  value={Number(ventas.length) % 100}
                  text={`${Number(ventas.length % 100)}%`}
                  strokeWidth={9}
                  // backgroundPadding={"#22c55e"}
                  styles={buildStyles({
                    textColor: "#0287e0 ",
                    pathColor: "#0287e0  ",
                    trailColor: "#e5e7eb",
                  })}
                />
              </div>
            </div>
          </div>
          <div className="stats shadow-xl items-center">
            <div className="stat">
              <div className="stat-title font-semibold">
                Total entradas del mes
              </div>
              <div className="stat-value text-sky-500">{entradas.length}</div>
              <div className="stat-desc font-bold text-sky-500 mt-1">
                ↗︎ {entradas.length & 100}%
              </div>
            </div>

            <div>
              <div className="py-5 px-5 w-32 font-bold mx-auto">
                <CircularProgressbar
                  value={Number(entradas.length) & 100}
                  text={`${Number(entradas.length & 100)}%`}
                  strokeWidth={9}
                  // backgroundPadding={"#22c55e"}
                  styles={buildStyles({
                    textColor: "#0287e0 ",
                    pathColor: "#0287e0  ",
                    trailColor: "#e5e7eb",
                  })}
                />
              </div>
            </div>
          </div>

          {/* Aquí podrías agregar otras métricas relacionadas con ventas */}
        </section>
        <div className="bg-white rounded-xl py-5 px-5 transition-all ease-linear flex gap-2 text-sm">
          <Link
            to={"/crear-salida"}
            className="bg-sky-500 py-3 px-6 rounded-full font-semibold text-white group flex gap-3 items-center relative transition-all"
          >
            Crear nueva salida
          </Link>
          <Link
            to={"/crear-entrada"}
            className="bg-sky-500 py-3 px-6 rounded-full font-semibold text-white group flex gap-3 items-center relative transition-all"
          >
            Crear nueva entrada
          </Link>
        </div>
        <TableVentas entradas={entradas} ventas={ventas} />{" "}
      </div>
    </div>
  );
}
