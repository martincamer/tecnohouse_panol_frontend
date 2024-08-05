import { useProductos } from "../context/ProductosContext";
import { Link } from "react-router-dom";
import { TableCategorias } from "../components/categorias/TableCategorias";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { FaArrowLeft } from "react-icons/fa";
dayjs.extend(utc);

export function CrearCategorias() {
  const { createCategoria } = useProductos();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  //submit crear
  const onSubmit = async (data) => {
    try {
      createCategoria({
        ...data,
        date: dayjs.utc(data.date).format(),
      });

      reset();
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <div className="bg-white w-full flex justify-between items-center ">
        <div className="flex border-b w-full border-gray-300">
          <Link
            to={"/productos"}
            className="bg-gray-100/50 px-8 text-base py-4 text-gray-700 font-medium hover:text-primary transition-all flex items-center gap-3"
          >
            <FaArrowLeft className="" /> Productos Productos
          </Link>
          <Link
            to={"/categorias"}
            className="bg-primary/10 px-8 text-base py-4 text-primary font-bold hover:bg-gray-100 transition-all"
          >
            Categorias
          </Link>
        </div>
      </div>
      <div className="mx-10 w-1/3 flex flex-col gap-2">
        <div className="bg-white my-5 rounded-md shadow-xl flex flex-col gap-0">
          <div className="bg-gray-800 py-4 rounded-t-md">
            <p className="text-white text-center text-base font-bold">
              Cargar una nueva categoria aca en este formulario.
            </p>
          </div>
          <div className="px-10 py-8 flex flex-col gap-5  border-b border-l border-r rounded-b-md border-gray-300">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700">
                  El nombre de la categoria
                </label>
                <input
                  {...register("detalle")}
                  type="text"
                  placeholder="Ej: tornillos, maderas,etc."
                  className={
                    "text-sm border border-gray-300 py-3 px-3 rounded-md outline-none focus:shadow cursor-pointer font-semibold uppercase"
                  }
                />
              </div>

              <div className="mt-3">
                <button
                  type="submit"
                  className="text-white px-6 transition-all text-sm text-center hover:shadow-md py-2 rounded-md bg-primary font-bold flex gap-2 items-center"
                >
                  Guardar categoria
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="px-10">
        <TableCategorias />
      </div>{" "}
    </section>
  );
}
