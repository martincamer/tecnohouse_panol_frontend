import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getSalidaCajonRequest,
  getSalidasCajonRequest,
  createSalidaCajonRequest,
  deleteSalidaCajonRequest,
  updateSalidaCajonRequest,
  updateSalidaCajonEstadoRequest,
} from "../api/salidaCajon";

const SalidaCajonContext = createContext();

export const useSalidasCajon = () => {
  const context = useContext(SalidaCajonContext);
  if (!context)
    throw new Error(
      "useSalidasCajon must be used within a SalidaCajonProvider"
    );
  return context;
};

export function SalidaCajonProvider({ children }) {
  const [salidasCajon, setSalidasCajon] = useState([]);
  const [error, setError] = useState([]);

  useEffect(() => {
    if (error.length > 0) {
      const timer = setTimeout(() => {
        setError([]);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const getSalidasCajon = async () => {
    try {
      const res = await getSalidasCajonRequest();
      setSalidasCajon(res.data);
    } catch (error) {
      console.error("Error al obtener las salidas de cajón:", error);
    }
  };

  const createSalidaCajon = async (salidaCajon) => {
    try {
      const res = await createSalidaCajonRequest(salidaCajon);
      setSalidasCajon(res.data);

      toast.success("Salida de cajón creada correctamente", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        style: {
          padding: "10px",
          borderRadius: "15px",
        },
      });
    } catch (error) {
      console.error("Error al crear la salida de cajón:", error);
      setError(error.response.data.message);
    }
  };

  const updateSalidaCajon = async (id, salidaCajon) => {
    try {
      const res = await updateSalidaCajonRequest(id, salidaCajon);

      setSalidasCajon(res.data);

      toast.success("Salida de cajón editada correctamente", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        style: {
          padding: "10px",
          borderRadius: "15px",
        },
      });
    } catch (error) {
      console.error("Error al actualizar la salida de cajón:", error);
    }
  };

  const updateSalidaCajonEstado = async (id, salidaCajon) => {
    try {
      const res = await updateSalidaCajonEstadoRequest(id, salidaCajon);

      setSalidasCajon(res.data);

      toast.success("Estado actualizado correctamente", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        style: {
          padding: "10px",
          borderRadius: "15px",
        },
      });
    } catch (error) {
      console.error("Error al actualizar la salida de cajón:", error);
    }
  };

  const deleteSalidaCajon = async (id) => {
    try {
      const res = await deleteSalidaCajonRequest(id);

      setSalidasCajon(res.data);

      toast.error("Salida de cajón eliminada correctamente", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        style: {
          padding: "10px",
          borderRadius: "15px",
        },
      });
    } catch (error) {
      console.error("Error al eliminar la salida de cajón:", error);
    }
  };

  const getSalidaCajon = async (id) => {
    try {
      const res = await getSalidaCajonRequest(id);
      return res.data;
    } catch (error) {
      console.error("Error al obtener la salida de cajón:", error);
    }
  };

  return (
    <SalidaCajonContext.Provider
      value={{
        salidasCajon,
        setSalidasCajon,
        getSalidasCajon,
        getSalidaCajon,
        createSalidaCajon,
        deleteSalidaCajon,
        updateSalidaCajon,
        updateSalidaCajonEstado,
        error,
      }}
    >
      {children}
    </SalidaCajonContext.Provider>
  );
}
