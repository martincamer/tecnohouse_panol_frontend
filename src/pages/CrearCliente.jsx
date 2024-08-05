import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useClientes } from "../context/ClientesContext"; // Cambia al contexto de clientes
import { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";

export function CrearEmpleadoNuevo() {
  const { createCliente, getClientes } = useClientes(); // Cambia al método para crear cliente
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // Uso de React Hook Form para validación

  useEffect(() => {
    getClientes(); // Si es necesario, obtiene clientes cuando se monta el componente
  }, []);

  const onSubmit = async (formData) => {
    try {
      await createCliente(formData); // Crea un nuevo cliente con el objeto de datos
      navigate("/empleados"); // Redirige a la página de clientes después de la creación
    } catch (error) {
      console.error("Error creating client:", error);
    }
  };

  return (
    <section>
      <div className="bg-white w-full flex justify-between items-center ">
        <div className="flex border-b w-full border-gray-300">
          <Link
            to={"/empleados"}
            className="bg-gray-100/50 px-8 text-base py-4 text-gray-700 font-medium hover:text-primary transition-all flex items-center gap-3"
          >
            <FaArrowLeft className="" /> Empleados
          </Link>
          <Link
            to={"/crear-empleado"}
            className="bg-primary/10 px-8 text-base py-4 text-primary font-bold hover:bg-gray-100 transition-all"
          >
            Crear nuevo empleado
          </Link>
        </div>
      </div>

      <div className="mx-10 flex justify-start items-start gap-16">
        <div className="w-1/3">
          <div className="flex flex-col gap-1">
            <p className="font-bold text-slate-700 mt-10 text-xl">
              Crear Empleado
            </p>
            <p className="text-slate-600 font-semibold text-sm">
              En esta sección podrás cargar nuevos empleados al sistema.
            </p>
          </div>

          <div className="bg-white my-10 rounded-md border border-gray-300 flex flex-col gap-3 shadow-xl py-5 px-5">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700">
                  Nombre
                </label>
                <input
                  {...register("nombre", { required: true })}
                  type="text"
                  placeholder="Nombre"
                  className={
                    "text-sm border border-gray-300 py-3 px-3 rounded-md outline-none focus:shadow cursor-pointer font-semibold uppercase"
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 ">
                  Apellido
                </label>
                <input
                  {...register("apellido", { required: true })}
                  type="text"
                  placeholder="Apellido"
                  className={
                    "text-sm border border-gray-300 py-3 px-3 rounded-md outline-none focus:shadow cursor-pointer font-semibold uppercase"
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700">
                  Fabrica
                </label>
                <input
                  {...register("fabrica")}
                  type="text"
                  placeholder="FABRICA"
                  className={
                    "text-sm border border-gray-300 py-3 px-3 rounded-md outline-none focus:shadow cursor-pointer font-semibold uppercase"
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 ">
                  Zona/Sector del empleador
                </label>
                <input
                  {...register("zona")}
                  type="text"
                  placeholder="Sector"
                  className={
                    "text-sm border border-gray-300 py-3 px-3 rounded-md outline-none focus:shadow cursor-pointer font-semibold uppercase"
                  }
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="text-white px-6 transition-all text-sm text-center hover:shadow-md py-2 rounded-md bg-primary font-bold flex gap-2 items-center"
                >
                  Guardar empleado
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
