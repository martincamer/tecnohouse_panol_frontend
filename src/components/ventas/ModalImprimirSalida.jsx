import React, { useEffect, useState } from "react";
import { useVentas } from "../../context/VentasContext";
import { PDFViewer } from "@react-pdf/renderer";
import { DocumentoSalida } from "../pdfs/DocumentoSalida";

export const ModalImprimirSalida = ({ idObtenida }) => {
  const { getVenta } = useVentas();
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await getVenta(idObtenida); // Obtiene el cliente por ID
        setDatos(res); // Establece el estado del cliente
      } catch (error) {
        console.error("Error al cargar el cliente:", error); // Manejo de errores
      }
    };

    loadData(); // Carga los datos del cliente cuando el componente se monta
  }, [idObtenida, getVenta]); // Asegúrate de incluir las dependencias necesarias

  return (
    <dialog id="my_modal_salida" className="modal">
      <div className="modal-box max-w-3xl px-10 py-10">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Imprimir la salida,descargar,etc.</h3>
        <p className="py-1">En esta sección podras imprimir la salida.</p>

        <PDFViewer className="w-full h-[60vh]">
          <DocumentoSalida datos={datos} />
        </PDFViewer>
      </div>
    </dialog>
  );
};
