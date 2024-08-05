import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useProductos } from "../context/ProductosContext";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { productoSchema } from "../schemas/productos";
import { Message } from "../components/ui";
import axios from "axios"; // Importamos axios para la llamada a Cloudinary
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import FileDropZone from "../components/ui/FileDropZone";
import { FaArrowLeft } from "react-icons/fa";

dayjs.extend(utc);

export function CrearProductoNuevo() {
  const {
    createProducto,
    colores,
    categorias,
    getColores,
    getCategorias,
    error,
  } = useProductos();

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(productoSchema),
  });

  const [uploadedFile, setUploadedFile] = useState(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    getColores();
    getCategorias();
  }, []);

  // Función para subir la imagen a Cloudinary y obtener la URL
  const uploadFile = async (file) => {
    if (!file) {
      return null;
    }

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "productos");

    try {
      const api = `https://api.cloudinary.com/v1_1/dgchynrxl/image/upload`;
      const res = await axios.post(api, data);
      const { secure_url } = res.data; // Obtenemos la URL segura
      return secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      return null;
    }
  };

  const onSubmit = async (formData) => {
    try {
      // Subimos la imagen a Cloudinary y obtenemos la URL
      const imageURL = await uploadFile(uploadedFile);

      // Creamos el objeto del producto con todos los datos y la URL de la imagen
      const productData = {
        ...formData,
        date: dayjs.utc(formData.date).format(),
        imagen: imageURL, // Añadimos la URL de la imagen
      };

      await createProducto(productData);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  // Event handlers for drag and drop
  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setUploadedFile(file);
      setDragging(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
  };

  return (
    <section>
      <div className="bg-white w-full flex justify-between items-center ">
        <div className="flex border-b w-full border-gray-300">
          <Link
            to={"/productos"}
            className="bg-gray-100/50 px-8 text-base py-4 text-gray-700 font-medium hover:text-primary transition-all flex items-center gap-3"
          >
            <FaArrowLeft className="" /> Productos
          </Link>
          <Link
            to={"/crear-producto"}
            className="bg-primary/10 px-8 text-base py-4 text-primary font-bold hover:bg-gray-100 transition-all"
          >
            Crear nuevo producto
          </Link>
        </div>
        <div className="mx-9 hidden">
          <div className="text-sm breadcrumbs">
            <ul>
              <li>
                <Link
                  className="bg-gray-100 text-gray-700 py-2 px-4 rounded-xl cursor-pointer font-semibold"
                  to={"/home"}
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  className="bg-sky-100 text-sky-700 py-2 px-4 rounded-xl cursor-pointer font-semibold"
                  to={"/productos"}
                >
                  Productos
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-10 flex justify-start items-start gap-16">
        <div className="w-1/2">
          <div className="flex flex-col gap-1">
            <p className="font-bold text-slate-700 mt-10 text-2xl">
              Cargar un nuevo producto.
            </p>
            <p className="text-slate-600 font-medium text-sm">
              En esta sección podras crear nuevos productos.
            </p>
          </div>

          <div className="bg-white my-10 rounded-md border border-gray-300 flex flex-col gap-3 shadow-xl">
            <div className="px-10 py-0 flex flex-col gap-5">
              {/* <div
                className={`${
                  error.length > 0
                    ? "grid grid-cols-3 py-2 px-2 gap-2"
                    : "hidden"
                }`}
              >
                {error?.map((error, i) => (
                  <Message message={error} key={i} />
                ))}
              </div> */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4 py-5"
              >
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700">
                    El codigo del producto
                  </label>
                  <input
                    autoFocus
                    {...register("codigo")}
                    type="text"
                    placeholder="Ej: 12-06"
                    className={
                      "text-sm border border-gray-300 py-3 px-3 rounded-md outline-none focus:shadow cursor-pointer font-semibold uppercase"
                    }
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700">
                    La descripción
                  </label>
                  <input
                    {...register("detalle")}
                    type="text"
                    placeholder="Ej: Tornillo Fix 12.5"
                    className={
                      "text-sm border border-gray-300 py-3 px-3 rounded-md outline-none focus:shadow cursor-pointer font-semibold uppercase"
                    }
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700">
                    Seleccionar un color
                  </label>
                  <select
                    {...register("color")}
                    type="text"
                    className={
                      "text-sm border border-gray-300 py-3 px-3 rounded-md outline-none focus:shadow cursor-pointer font-semibold uppercase"
                    }
                  >
                    <option value="">Seleccionar el color</option>
                    {colores.map((c) => (
                      <option key={c._id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700">
                    Seleccionar una categoria
                  </label>
                  <select
                    {...register("categoria")}
                    type="text"
                    className={
                      "text-sm border border-gray-300 py-3 px-3 rounded-md outline-none focus:shadow cursor-pointer font-semibold uppercase"
                    }
                  >
                    <option value="">Seleccionar la categoria</option>
                    {categorias.map((c) => (
                      <option key={c._id}>{c.detalle}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700">
                    Seleccionar el tipo
                  </label>
                  <select
                    {...register("tipo")}
                    type="text"
                    className={
                      "text-sm border border-gray-300 py-3 px-3 rounded-md outline-none focus:shadow cursor-pointer font-semibold uppercase"
                    }
                  >
                    <option value="">Seleccionar el tipo</option>
                    <option value="unidad">Unidad</option>
                    <option value="kilogramos">Kilogramos</option>
                    <option value="Paquete">Paquete</option>
                    <option value="metros">Metros</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700">
                    Stock del producto en fabrica / pueden ser unds, metros,etc,
                    numerico.
                  </label>
                  <input
                    {...register("stock")}
                    type="text"
                    placeholder="Ej: 100"
                    className={
                      "text-sm border border-gray-300 py-3 px-3 rounded-md outline-none focus:shadow cursor-pointer font-semibold uppercase"
                    }
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700">
                    Stock del producto minimo
                  </label>
                  <input
                    {...register("stock_minimo")}
                    type="text"
                    placeholder="Ej: 200"
                    className={
                      "text-sm border border-gray-300 py-3 px-3 rounded-md outline-none focus:shadow cursor-pointer font-semibold uppercase"
                    }
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700">
                    Stock del producto maximo
                  </label>
                  <input
                    {...register("stock_maximo")}
                    type="text"
                    placeholder="Ej: 300"
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
                    Cargar el producto nuevo al sistema
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="mt-[8.5rem]">
          <FileDropZone
            dragging={dragging}
            handleDragLeave={handleDragLeave}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
            handleFileChange={handleFileChange}
            handleRemoveFile={handleRemoveFile}
            setDragging={setDragging}
            setUploadedFile={setUploadedFile}
            uploadedFile={uploadedFile}
          />
        </div>
      </div>
    </section>
  );
}
