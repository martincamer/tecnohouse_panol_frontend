import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProductos } from "../context/ProductosContext";
import { BsFolderPlus } from "react-icons/bs";
import { TableProducts } from "../components/products/TableProducts";
import { IoFilterOutline } from "react-icons/io5";

export function ProductosPage() {
  function openModal() {
    setIsOpen(true);
  }

  const { productos, getProductos } = useProductos();

  useEffect(() => {
    getProductos();
  }, []);

  const [idObtenida, setObtenerId] = useState(null);

  const handleID = (id) => setObtenerId(id);

  return (
    <div>
      <div className="bg-gray-100 py-10 px-10 flex items-center justify-between max-md:flex-col max-md:gap-3">
        <p className="font-bold text-2xl">Sector de productos.</p>
        <Link
          to={"/crear-producto"}
          className="bg-primary text-sm rounded-md font-semibold py-2 px-4 text-white group flex gap-3 items-center relative transition-all max-md:hidden"
        >
          <span className="transition-opacity duration-300 opacity-100 group-hover:opacity-0">
            Crear nuevo producto
          </span>
          <BsFolderPlus className="text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute left-0 right-0 top-0 bottom-0 m-auto" />
        </Link>
      </div>

      <div className="bg-white rounded-xl py-5 px-10 transition-all ease-linear flex gap-2 text-sm max-md:flex-col max-md:py-0  max-md:pt-5 max-md:px-5 max-md:hidden">
        <Link
          to={"/categorias"}
          className="bg-blue-500/90 py-2 px-4 rounded-md text-white font-semibold group flex gap-3 items-center relative transition-all"
        >
          <span className="transition-opacity duration-300 opacity-100 group-hover:opacity-0">
            Crear nuevas categorias
          </span>
          <IoFilterOutline className="text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute left-0 right-0 top-0 bottom-0 m-auto" />
        </Link>
        <Link
          to={"/colores"}
          className="bg-green-500 py-2 px-4 rounded-md text-white font-semibold group flex gap-3 items-center relative transition-all"
        >
          <span className="transition-opacity duration-300 opacity-100 group-hover:opacity-0">
            Crear nuevos colores
          </span>
          <IoFilterOutline className="text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute left-0 right-0 top-0 bottom-0 m-auto" />
        </Link>
      </div>

      <TableProducts
        handleID={handleID}
        openModal={openModal}
        productos={productos}
      />
    </div>
  );
}
