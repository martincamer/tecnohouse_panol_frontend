import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useVentas } from "../context/VentasContext";
import dayjs from "dayjs"; // Para formatear fechas

export function Entrada() {
  const { getEntrada } = useVentas(); // Función para obtener un cliente

  const [venta, setVenta] = useState({}); // Estado para almacenar el cliente

  const params = useParams(); // Para obtener el ID del cliente desde la URL

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await getEntrada(params.id); // Obtiene el cliente por ID
        setVenta(res); // Establece el estado del cliente
      } catch (error) {
        console.error("Error al cargar el cliente:", error); // Manejo de errores
      }
    };

    loadData(); // Carga los datos del cliente cuando el componente se monta
  }, [params.id, getEntrada]); // Asegúrate de incluir las dependencias necesarias

  const formatDate = (date) => {
    return dayjs(date).format("DD/MM/YYYY"); // Formato de fecha
  };

  return (
    <div className="pb-12">
      <div className="bg-white w-full flex justify-between items-center">
        <div className="flex">
          <Link
            to={"/registros"}
            className="px-8 text-base py-4 text-gray-700 font-medium hover:text-sky-700 transition-all"
          >
            Registros
          </Link>
          <Link
            to={`/entrada/${params.id}`}
            className="bg-sky-100 px-8 text-base py-4 text-sky-700 font-medium hover:bg-gray-100 transition-all"
          >
            Detalle de la entrada
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

      <div className="mx-10 py-10">
        <div className="flex flex-col gap-1">
          <p className="font-bold text-slate-700 text-xl">
            Datos de la entrada{" "}
            <span className="text-sky-700 capitalize">
              {venta?.proveedor_factura}
            </span>
          </p>
          <p className="text-slate-600 font-semibold text-sm">
            Aquí puedes ver información detallada del proveedor/entrada
          </p>
        </div>

        <div className="flex gap-10 mt-10">
          <div className="bg-white rounded-xl w-1/2">
            <div className="py-10 px-10 bg-white rounded-xl flex justify-between">
              <div className="flex flex-col gap-5">
                <p>
                  Fecha de creación{" "}
                  <span className="text-slate-600 font-bold">
                    {formatDate(venta.date)} {/* Fecha de creación */}
                  </span>
                </p>
                <p>
                  Proveedor{" "}
                  <span className="text-slate-600 font-bold capitalize">
                    {venta?.proveedor_factura}
                  </span>
                </p>
                <p>
                  Numero °
                  <span className="text-slate-600 font-bold capitalize">
                    {" "}
                    {venta?.numero_factura}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8 flex justify-between mx-10">
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-gray-700 text-xl">
            Productos de la{" "}
            <span className="capitalize text-sky-700">entrada</span>{" "}
          </p>
          <p className="text-gray-600 font-semibold text-sm">
            Aquí puedes ver información de los productos cargados
          </p>
        </div>
      </div>

      <div className="mb-10 mx-10 rounded-xl">
        <table className="table bg-white">
          <thead>
            <tr>
              <th className="py-4 text-sky-700 font-semibold text-base">
                Codigo
              </th>
              <th className="py-4 text-sky-700 font-semibold text-base">
                Descripción
              </th>
              <th className="py-4 text-sky-700 font-semibold text-base">
                Color
              </th>
              <th className="py-4 text-sky-700 font-semibold text-base">
                Categoria
              </th>
              <th className="py-4 text-sky-700 font-semibold text-base">
                Tipo
              </th>
              <th className="py-4 text-sky-700 font-semibold text-base">
                Cantidad
              </th>
              <th className="py-4 text-sky-700 font-semibold text-base">
                Vista
              </th>
            </tr>
          </thead>
          <tbody className="uppercase">
            {venta?.productos?.map((p) => (
              <tr key={p.id}>
                <td className="py-5 text-gray-700 font-semibold">{p.codigo}</td>
                <td className="py-5 text-gray-700 font-semibold">
                  {p.detalle}
                </td>
                <td className="py-5 text-gray-700 font-semibold">{p.color}</td>
                <td className="py-5 text-gray-700 font-semibold">
                  {p.categoria}
                </td>
                <td className="py-5 text-gray-700 font-semibold">{p.tipo}</td>

                <td className="py-5 text-gray-700 font-bold">
                  {Number(p.cantidad)}
                </td>
                <td>
                  <img className="w-[70px]" src={p.imagen} alt="img" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
