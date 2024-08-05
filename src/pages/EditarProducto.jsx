import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useProductos } from "../context/ProductosContext";
import { useEffect, useState } from "react";
import axios from "axios"; // Importamos axios para la llamada a Cloudinary
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import FileDropZone from "../components/ui/FileDropZone";
import { FaArrowLeft } from "react-icons/fa";

dayjs.extend(utc);

export function EditarProducto() {
  const params = useParams();
  const [producto, setProducto] = useState([]);

  const {
    updateProducto,
    colores,
    categorias,
    getColores,
    getCategorias,
    getProducto,
  } = useProductos();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [uploadedFile, setUploadedFile] = useState(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    getColores();
    getCategorias();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      const res = await getProducto(params.id);
      setValue("codigo", res.codigo);
      setValue("detalle", res.detalle);
      setValue("color", res.color);
      setValue("categoria", res.categoria);
      setValue("tipo", res.tipo);
      setValue("stock", res.stock);
      setValue("stock_minimo", res.stock_minimo);
      setValue("stock_maximo", res.stock_maximo);

      setProducto(res);
    };
    loadData();
  }, [params.id]);

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
        imagen: imageURL || producto.imagen, // Añadimos la URL de la imagen
      };

      await updateProducto(params.id, productData);

      setTimeout(() => {
        navigate("/productos");
      }, 1000);
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
            to={`/editar-producto/${params.id}`}
            className="bg-primary/10 px-8 text-base py-4 text-primary font-bold hover:bg-gray-100 transition-all"
          >
            Actualizar producto
          </Link>
        </div>
      </div>
      <div className="mx-10 flex justify-start items-start gap-16">
        <div className="w-1/2">
          <div className="flex flex-col gap-1">
            <p className="font-bold text-slate-700 mt-10 text-xl">
              Actualizar el producto - codigo {producto.codigo}
            </p>
            <p className="text-slate-600 font-semibold text-sm">
              En esta sección podras actualizar el producto seleccionado.
            </p>
          </div>
          <div className="bg-white my-10 rounded-md border border-gray-300 flex flex-col gap-3 shadow-xl">
            <div className="px-10 py-8 flex flex-col gap-5">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700">
                    El codigo
                  </label>
                  <input
                    {...register("codigo")}
                    type="text"
                    placeholder="Ej: Tkpr1"
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
                    placeholder="Ej: Tkpr1"
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
                    Stock del producto en fabrica
                  </label>
                  <input
                    {...register("stock")}
                    type="text"
                    placeholder="Ej: 100 font-bold"
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
                  <label className="text-sm font-bold text-slate-700">
                    Imagen del producto
                  </label>
                  <img className="w-[200px]" src={producto.imagen} />
                </div>
                <div className="flex items-center gap-4">
                  {/* <Link
                    to={`/producto/${producto._id}`}
                    className="transition-all hover:bg-orange-500/20 text-orange-400 py-3 px-6 text-sm rounded-md font-semibold mt-3 cursor-pointer"
                  >
                    Cancelar
                  </Link> */}
                  <button
                    type="submit"
                    className="text-white px-6 transition-all text-sm text-center hover:shadow-md py-2 rounded-md bg-primary font-bold flex gap-2 items-center"
                  >
                    Actualizar el producto
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
