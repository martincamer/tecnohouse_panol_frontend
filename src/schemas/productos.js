import { z } from "zod";

export const productoSchema = z.object({
  codigo: z.string().nonempty({ message: "El código es requerido" }),
  detalle: z.string().nonempty({ message: "El detalle es requerido" }),
  color: z.string().nonempty({ message: "El color es requerido" }),
  categoria: z.string().nonempty({ message: "La categoría es requerida" }),
  tipo: z.string().nonempty({ message: "Es requerido el tipo" }),
  stock: z.string().nonempty({ message: "" }),
  stock_minimo: z.string().nonempty({ message: "" }),
  stock_maximo: z.string().nonempty({ message: "" }),
});
