import axios from "axios";
import IClient from "@/interfaces/IClient";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export async function postClientData(body: IClient) {
  const promise = await api.post("/pessoas", body);
  return promise.data;
}

export async function getClientData() {
  const promise = await api.get("/pessoas");
  return promise.data;
}

export async function getSearchClientData(search: string) {
  const promise = (await api.get(`/pessoas`)).data;

  const filteredData = promise.filter(
    (person: IClient) =>
      person.name.toLowerCase().includes(search.toLowerCase()) ||
      person.cpf.includes(search) ||
      person.date.includes(search)
  );

  return filteredData;
}
