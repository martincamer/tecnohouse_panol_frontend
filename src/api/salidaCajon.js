import axios from "./axios";

export const getSalidasCajonRequest = async () => axios.get("/salidas-cajon");

export const createSalidaCajonRequest = async (salidaCajon) =>
  axios.post("/salidas-cajon", salidaCajon);

export const updateSalidaCajonRequest = async (id, salidaCajon) =>
  axios.put(`/salidas-cajon/${id}`, salidaCajon);

export const updateSalidaCajonEstadoRequest = async (id, salidaCajon) =>
  axios.put(`/salidas-cajon-estado/${id}`, salidaCajon);

export const deleteSalidaCajonRequest = async (id) =>
  axios.delete(`/salidas-cajon/${id}`);

export const getSalidaCajonRequest = async (id) =>
  axios.get(`/salidas-cajon/${id}`);
