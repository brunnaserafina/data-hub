import axios from "axios";
import IClient from "@/interfaces/IClient";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export async function postClientData(body: IClient) {
  try {
    const response = await api.post("/pessoas", body);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getClientData() {
  const promise = await api.get("/pessoas");
  console.log(promise);
  return promise.data;
}
