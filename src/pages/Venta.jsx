import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useVentas } from "../context/VentasContext";
import { formatearDinero } from "../helpers/FormatearDinero";
import dayjs from "dayjs"; // Para formatear fechas
import { FaArrowLeft } from "react-icons/fa";

export function Venta() {
  const { getVenta } = useVentas(); // Función para obtener un cliente

  const [venta, setVenta] = useState({}); // Estado para almacenar el cliente

  const params = useParams(); // Para obtener el ID del cliente desde la URL

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await getVenta(params.id); // Obtiene el cliente por ID
        setVenta(res); // Establece el estado del cliente
      } catch (error) {
        console.error("Error al cargar el cliente:", error); // Manejo de errores
      }
    };

    loadData(); // Carga los datos del cliente cuando el componente se monta
  }, [params.id, getVenta]); // Asegúrate de incluir las dependencias necesarias

  const formatDate = (date) => {
    return dayjs(date).format("DD/MM/YYYY"); // Formato de fecha
  };

  // Formatear el total como moneda argentina

  const totalVenta = venta?.productos?.reduce(
    (total, producto) => total + producto.total_dinero,
    0
  );

  const totalKIlogramos = venta?.productos?.reduce(
    (total, producto) => total + producto.total_kilogramos,
    0
  );

  const totalPerfiles = venta?.productos?.reduce(
    (total, producto) => total + producto.cantidad,
    0
  );

  // Objeto para agrupar por categoria y color
  const groupedByCategoryAndColor = {};

  // Agrupar productos por categoria y color
  venta?.productos?.forEach((producto) => {
    const key = `${producto.categoria}-${producto.color}`; // Clave para agrupar

    if (!groupedByCategoryAndColor[key]) {
      // Si la clave no existe, crear una nueva entrada
      groupedByCategoryAndColor[key] = {
        categoria: producto.categoria,
        color: producto.color,
        precio: producto.precio,
        total_dinero: 0,
        total_kilogramos: 0,
      };
    }

    // Sumar los valores al grupo existente
    groupedByCategoryAndColor[key].total_dinero += producto.total_dinero;
    groupedByCategoryAndColor[key].total_kilogramos +=
      producto.total_kilogramos;
  });

  // Convertir el objeto a un arreglo
  const groupedProducts = Object.values(groupedByCategoryAndColor);

  console.log(groupedProducts);

  return (
    <div className="pb-12">
      <div className="bg-white w-full flex justify-between items-center ">
        <div className="flex border-b w-full border-gray-300">
          <Link
            to={"/registros"}
            className="bg-gray-100/50 px-8 text-base py-4 text-gray-700 font-medium hover:text-primary transition-all flex items-center gap-3"
          >
            <FaArrowLeft className="" /> Registros
          </Link>
          <Link className="bg-primary/10 px-8 text-base py-4 text-primary font-bold hover:bg-gray-100 transition-all">
            Detalle de la salida
          </Link>
        </div>
      </div>

      <div className="mx-10 py-10">
        <div className="flex flex-col gap-1">
          <p className="font-bold text-slate-700 text-xl">
            Datos de la salida{" "}
            <span className="text-primary capitalize">
              {venta?.cliente?.nombre} {venta?.cliente?.apellido}.
            </span>
          </p>
          <p className="text-slate-600 font-semibold text-sm">
            Aquí puedes ver información detallada del empleado.
          </p>
        </div>

        <div className="flex gap-10 mt-10">
          <div className="bg-white rounded-xl w-1/2">
            <div className="py-10 px-10 bg-gray-800 text-white rounded-xl flex justify-between">
              <div className="flex flex-col gap-5">
                <p>
                  Fecha de creación{" "}
                  <span className="text-white font-bold">
                    {formatDate(venta.date)} {/* Fecha de creación */}
                  </span>
                </p>
                <p>
                  Nombre completo{" "}
                  <span className="text-white font-bold capitalize">
                    {venta?.cliente?.nombre} {venta?.cliente?.apellido}
                  </span>
                </p>
                <p>
                  Zona/Sector{" "}
                  <span className="text-white font-bold capitalize">
                    {venta?.cliente?.zona}
                  </span>
                </p>
              </div>
              <p>
                Fabrica{" "}
                <span className="text-white font-bold capitalize">
                  {venta?.cliente?.fabrica}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 py-10 w-1/2 mt-5 rounded-xl px-10">
          <p className="font-bold text-base text-white">
            Nota/Detalles de la salida:{" "}
            <span className="font-medium text-gray-500">{venta?.nota}</span>
          </p>
        </div>
      </div>

      <div className="mb-8 flex justify-between mx-10">
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-gray-700 text-xl">
            Productos de la{" "}
            <span className="capitalize text-blue-500">salida</span>.{" "}
          </p>
          <p className="text-gray-600 font-semibold text-sm">
            Aquí puedes ver información de los productos.
          </p>
        </div>
      </div>

      <div className="px-10">
        <table className="table bg-white">
          <thead>
            <tr className="text-gray-800 text-sm">
              <th>Codigo</th>
              <th>Descripción</th>
              <th>Color</th>
              <th>Categoria</th>
              <th>Tipo</th>
              <th>Cantidad</th>
              <th>Vista</th>
            </tr>
          </thead>
          <tbody className="uppercase text-xs">
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
