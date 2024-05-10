import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useVentas } from "../context/VentasContext";

export function HomeApp() {
  const { ventas, getVentas, entradas, getEntradas } = useVentas(); // Cambia a ventas y función para obtener ventas

  useEffect(() => {
    getVentas(); // Obtiene las ventas cuando el componente se monta
    getEntradas();
  }, []); // No olvides agregar dependencias necesarias para evitar advertencias

  return (
    <section className="mx-10 my-10">
      <div className="grid grid-cols-3 gap-3">
        <div className="stats items-center">
          <div className="stat">
            <div className="stat-title font-semibold">
              Total salidas del mes
            </div>
            <div className="stat-value text-green-500"> {ventas.length}</div>
            <div className="stat-desc font-bold text-green-500 mt-1">
              ↗︎ {ventas.length}%
            </div>
          </div>

          <div>
            <div className="py-5 px-5 w-32 font-bold mx-auto">
              <CircularProgressbar
                value={Number(ventas.length) & 100}
                text={`${ventas.length}%`}
                strokeWidth={9}
                // backgroundPadding={"#22c55e"}
                styles={buildStyles({
                  textColor: "rgb(34 197 94)",
                  pathColor: "rgb(34 197 94)",
                  trailColor: "#e5e7eb",
                })}
              />
            </div>
          </div>
        </div>

        <div className="stats items-center">
          <div className="stat">
            <div className="stat-title font-semibold">
              Total entradas del mes
            </div>
            <div className="stat-value text-sky-500"> {entradas.length}</div>
            <div className="stat-desc font-bold text-sky-500 mt-1">
              ↗︎ {entradas.length}%
            </div>
          </div>

          <div>
            <div className="py-5 px-5 w-32 font-bold mx-auto">
              <CircularProgressbar
                value={Number(entradas.length) & 100}
                text={`${entradas.length}%`}
                strokeWidth={9}
                // backgroundPadding={"#22c55e"}
                styles={buildStyles({
                  textColor: "#0287e0 ",
                  pathColor: "#0287e0",
                  trailColor: "#e5e7eb",
                })}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="mt-12  grid grid-cols-2 gap-4">
        <div className="bg-white py-5 px-5 rounded-xl">
          <p className="font-semibold text-sky-500 px-5">
            Ventas generadas mensuales grafico
          </p>
          <VentasAreaChart ventas={ventas} />
        </div>
        <div className="bg-white py-5 px-5 rounded-xl">
          <p className="font-semibold text-sky-500 px-5">
            Comprobantes cargados mensuales grafico
          </p>
          <ComprobantesLineChart datos={comprobante} />
        </div>
      </div> */}
    </section>
  );
}
