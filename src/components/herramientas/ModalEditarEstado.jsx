import React, { useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useForm } from "react-hook-form";
import { useSalidasCajon } from "../../context/CajonSalidasContext";

dayjs.extend(utc);

export const ModalEditarEstado = ({ idObtenida }) => {
  const { register, handleSubmit, setValue } = useForm();
  const { updateSalidaCajonEstado, getSalidaCajon, setSalidaCajon } =
    useSalidasCajon();

  useEffect(() => {
    const loadData = async () => {
      const res = await getSalidaCajon(idObtenida);

      setValue("estado", res.estado);
    };
    loadData();
  }, [idObtenida]);

  const onSubmit = async (formData) => {
    try {
      // Creamos el objeto de salida del cajón con todos los datos
      const salidaCajonData = {
        ...formData,
      };

      await updateSalidaCajonEstado(idObtenida, salidaCajonData);

      document.getElementById("modal_editar_estado").close();
    } catch (error) {
      console.error("Error creating salida de cajón:", error);
    }
  };

  return (
    <dialog id="modal_editar_estado" className="modal">
      <div className="modal-box max-w-md">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>

        <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="py-4">
              <h3 className="font-bold text-lg">
                Actualiza el estado de la salida
              </h3>
              <p className="py-2">
                En esta sección podrás actualizar salida del cajón.
              </p>

              {/* Select para seleccionar el número del cajón */}
              <div className="flex flex-col mb-5">
                <label className="py-2 text-sm font-bold">
                  Seleccionar el estado de la salida
                </label>
                <select
                  {...register("estado")}
                  className="border border-sky-700 rounded-xl py-2 px-2 text-sm outline-none"
                >
                  <option className="font-bold text-sky-700" value="">
                    Selecciona un estado
                  </option>
                  <option className="font-semibold" value="en viaje">
                    En viaje
                  </option>
                  <option className="font-semibold" value="en fabrica">
                    En fabrica
                  </option>
                  <option className="font-semibold" value="perdido">
                    Perdido
                  </option>
                </select>
              </div>

              <button
                type="submit"
                className="font-bold bg-green-500 py-2 px-4 rounded-full text-white text-sm"
              >
                Actualizar la salida del cajón
              </button>
            </div>
          </div>
        </form>
      </div>
    </dialog>
  );
};
