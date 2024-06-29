import axios from "./axios";

export const getCajonesRequest = async () => axios.get("/cajones");

export const createCajonRequest = async (cajon) =>
  axios.post("/cajones", cajon);

export const updateCajonRequest = async (id, cajon) =>
  axios.put(`/cajones/${id}`, cajon);

export const updateCajonHerramientasRequest = async (id, cajon) =>
  axios.put(`/cajones-herramientas/${id}`, cajon);

export const deleteCajonRequest = async (id) => axios.delete(`/cajones/${id}`);

export const getCajonRequest = async (id) => axios.get(`/cajones/${id}`);
