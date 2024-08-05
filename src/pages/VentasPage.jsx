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
      <div className="bg-gray-100 py-10 px-10 flex items-center justify-between">
        <p className="font-bold text-2xl">
          Sector de salidas y entradas de productos.
        </p>
        {/* <Link
          to={"/crear-producto"}
          className="bg-primary text-sm rounded-md font-semibold py-2 px-4 text-white group flex gap-3 items-center relative transition-all"
        >
          <span className="transition-opacity duration-300 opacity-100 group-hover:opacity-0">
            Crear nuevo producto
          </span>
          <BsFolderPlus className="text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute left-0 right-0 top-0 bottom-0 m-auto" />
        </Link> */}
      </div>

      <div className="flex flex-col gap-5 mx-10">
        {/* <section className="py-10 grid grid-cols-3 gap-4">
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
                  styles={buildStyles({
                    textColor: "#0287e0 ",
                    pathColor: "#0287e0  ",
                    trailColor: "#e5e7eb",
                  })}
                />
              </div>
            </div>
          </div>
        </section> */}
        <div className="bg-white rounded-xl pt-10 px-5 transition-all ease-linear flex gap-2 text-sm">
          <Link
            to={"/crear-salida"}
            className="bg-primary text-sm rounded-md font-semibold py-2 px-4 text-white group flex gap-3 items-center relative transition-all"
          >
            Crear nueva salida
          </Link>
          <Link
            to={"/crear-entrada"}
            className="bg-blue-500 text-sm rounded-md font-semibold py-2 px-4 text-white group flex gap-3 items-center relative transition-all"
          >
            Crear nueva entrada
          </Link>
        </div>
        <TableVentas entradas={entradas} ventas={ventas} />{" "}
      </div>
    </div>
  );
}
