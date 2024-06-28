import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { DocumentoInventario } from "../pdfs/DocumentoInventario";

export const ModalImprimirProductos = ({ productos }) => {
  console.log(productos);
  return (
    <dialog id="my_modal_imprimir_productos" className="modal">
      <div className="modal-box max-w-3xl px-10 py-10">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Imprimir el inventario.</h3>
        <p className="py-1">
          En esta sección podras imprimir el inventario de productos.
        </p>

        <PDFViewer className="w-full h-[60vh]">
          <DocumentoInventario productos={productos} />
        </PDFViewer>
      </div>
    </dialog>
  );
};
