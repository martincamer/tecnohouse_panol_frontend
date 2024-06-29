import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  getCajonRequest,
  getCajonesRequest,
  createCajonRequest,
  deleteCajonRequest,
  updateCajonRequest,
  updateCajonHerramientasRequest,
} from "../api/cajon";

const CajonContext = createContext();

export const useCajones = () => {
  const context = useContext(CajonContext);
  if (!context)
    throw new Error("useCajones must be used within a CajonProvider");
  return context;
};

export function CajonProvider({ children }) {
  const [cajones, setCajones] = useState([]);
  const [error, setError] = useState([]);

  useEffect(() => {
    if (error.length > 0) {
      const timer = setTimeout(() => {
        setError([]);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const getCajones = async () => {
    try {
      const res = await getCajonesRequest();
      setCajones(res.data);
    } catch (error) {
      console.error("Error al obtener los cajones:", error);
    }
  };

  const createCajon = async (cajon) => {
    try {
      const res = await createCajonRequest(cajon);
      setCajones(res.data);

      toast.success("Cajón creado correctamente", {
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
      console.error("Error al crear el cajón:", error);
      setError(error.response.data.message);
    }
  };

  const updateCajon = async (id, producto) => {
    try {
      const res = await updateCajonHerramientasRequest(id, producto);

      setCajones(res.data);

      toast.success("Cajon editado correctamente", {
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
        // transition: "Bounce",
      });

      console.log("res", res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCajon = async (id) => {
    try {
      const res = await deleteCajonRequest(id);

      setCajones(res.data);

      toast.error("Cajón eliminado correctamente", {
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
      console.error("Error al eliminar el cajón:", error);
    }
  };

  const getCajon = async (id) => {
    try {
      const res = await getCajonRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CajonContext.Provider
      value={{
        cajones,
        setCajones,
        getCajones,
        getCajon,
        createCajon,
        deleteCajon,
        updateCajon,
        error,
      }}
    >
      {children}
    </CajonContext.Provider>
  );
}
