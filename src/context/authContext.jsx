import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import {
  loginRequest,
  registerRequest,
  updateUser,
  updateUserImagenUrl,
  verifyTokenRequest,
} from "../api/auth";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  // clear errors after 5 seconds
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      if (res.status === 200) {
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log(error.response.data);
      setErrors(error.response.data.message);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      // setErrors(error.response.data.message);
    }
  };

  const updateUserApi = async (id, datos) => {
    try {
      const res = await updateUser(id, datos);

      const usuarioActualizado = {
        ...user,
        ...res.data.user, // Reemplazar con los campos actualizados
      };

      // Actualizar el estado con el nuevo objeto
      setUser(usuarioActualizado);

      toast.success("Datos editados correctamente", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        style: {
          padding: "10px 15px",
          borderRadius: "15px",
        },
        // transition: "Bounce",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const updateUserImagen = async (id, datos) => {
    try {
      const res = await updateUserImagenUrl(id, datos);

      const usuarioActualizado = {
        ...user,
        ...res.data.user, // Reemplazar con los campos actualizados
      };

      // Actualizar el estado con el nuevo objeto
      setUser(usuarioActualizado);

      toast.success("Datos editados correctamente", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        style: {
          padding: "10px 15px",
          borderRadius: "15px",
        },
        // transition: "Bounce",
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();

      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        console.log(res);
        if (!res.data) return setIsAuthenticated(false);

        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
        // return;
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        signin,
        logout,
        isAuthenticated,
        errors,
        loading,
        updateUserApi,
        updateUserImagen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
