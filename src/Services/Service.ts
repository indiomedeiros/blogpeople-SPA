import type { Dispatch, SetStateAction } from "react";
import { api } from "./api";
import type { AxiosResponse } from "axios";

export async function getRquest<T>(
  url: string,
  data: object,
  setData: Dispatch<SetStateAction<T>>,
): Promise<void> {
  const response: AxiosResponse = await api.get(url, data);
  setData(response.data);
}

export async function postRquest<T>(
  url: string,
  data: object,
  setData: Dispatch<SetStateAction<T>>,
  header?: object,
): Promise<void> {
  const response: AxiosResponse = await api.post(url, data, header);
  setData(response.data);
}

export async function updateRequest<T>(
  url: string,
  data: object,
  setData: Dispatch<SetStateAction<T>>,
  header: object,
): Promise<void> {
  const response: AxiosResponse = await api.put(url, data, header);
  setData(response.data);
}

export async function deleteRequest<T>(
  url: string,
  setData: Dispatch<SetStateAction<T>>,
  header: object,
): Promise<void> {
  const response: AxiosResponse = await api.delete(url, header);
  setData(response.data);
}
