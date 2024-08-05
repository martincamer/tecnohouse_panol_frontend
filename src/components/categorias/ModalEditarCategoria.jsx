import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { useForm } from "react-hook-form";
import { useProductos } from "../../context/ProductosContext";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export default function ModalEditarCategoria({
  isOpen,
  closeModal,
  idObtenida,
}) {
  const { updateCategoria, getCategoria } = useProductos();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      updateCategoria(idObtenida, {
        ...data,
        date: dayjs.utc(data.date).format(),
      });

      closeModal();
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModal = () => {
    reset();
    closeModal();
  };

  useEffect(() => {
    const loadProducto = async () => {
      if (idObtenida) {
        const categoria = await getCategoria(idObtenida);

        setValue("detalle", categoria.detalle);
        setValue(
          "date",
          categoria.date ? dayjs(categoria.date).utc().format("YYYY-MM-DD") : ""
        );
      }
    };
    loadProducto();
  }, [idObtenida]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/10" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-end py-2">
                  <IoMdClose
                    onClick={() => handleCloseModal()}
                    className="cursor-pointer text-4xl text-red-800 hover:shadow-md transition-all ease-linear bg-red-100 py-2 px-2 rounded-xl"
                  />
                </div>
                {/* <Dialog.Title
                  as="h3"
                  className="text-sm text-sky-500 font-bold leading-6"
                >
                  Editar la categoria seleccionada
                </Dialog.Title> */}
                <div className="mt-2">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-2"
                  >
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-slate-700">
                        El nombre de la categoria
                      </label>
                      <input
                        {...register("detalle")}
                        type="text"
                        placeholder="Ej: herrero,modena,etc"
                        className={
                          "text-sm border border-gray-300 py-2 px-3 rounded-md outline-none focus:shadow cursor-pointer font-semibold uppercase"
                        }
                      />
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="text-white px-6 transition-all text-sm text-center hover:shadow-md py-2 rounded-md bg-primary font-bold flex gap-2 items-center"
                      >
                        Actualizar la categoria
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
