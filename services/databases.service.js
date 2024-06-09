import getConfig from "next/config";
import { fetchWrapper } from "helpers";
const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/databases`;

export const databasesService = {
	create,
	getAll,
	getById,
	update,
	changeStatus,
	getByStatus,
};
async function create(dataBases) {
	return await fetchWrapper.post(`${baseUrl}/create`, dataBases);
}
async function getAll() {
	return await fetchWrapper.get(baseUrl);
}
async function getById(id) {
	return await fetchWrapper.get(`${baseUrl}/${id}`);
}
async function update(id, params) {
	return await fetchWrapper.put(`${baseUrl}/${id}`, params);
}

async function changeStatus(id) {
	await fetchWrapper.put(`${baseUrl}/getByStatus/${id}`);
}

async function getByStatus(status) {
	console.log(status);
	return await fetchWrapper.put(`${baseUrl}/getByStatus`, { status: status });
}
