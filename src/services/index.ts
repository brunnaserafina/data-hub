import axios from "axios";
import IClient from "@/interfaces/IClient";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export async function postClientData(body: IClient) {
  const promise = await api.post("/pessoas", body);
  return promise.data;
}

export async function getClientData(): Promise<IClient[]> {
  const promise = await api.get("/pessoas");
  return promise.data;
}

export async function getSearchClientData(search: string): Promise<IClient[]> {
  const promise = (await api.get("/pessoas")).data;

  const filteredData = promise.filter(
    (person: IClient) =>
      person.nome.toLowerCase().includes(search.toLowerCase()) ||
      person.cpf.includes(search) ||
      person.dataNascimento.includes(search)
  );

  return filteredData;
}

export async function deleteClientData(id: number) {
  const promise = await api.delete(`/pessoas/${id}`);
  return promise;
}

export async function editClientData(id: number, body: IClient) {
  const promise = await api.put(`/pessoas/${id}`, body);
  return promise;
}
