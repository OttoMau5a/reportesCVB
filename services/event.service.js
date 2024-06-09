import getConfig from 'next/config';
import { fetchWrapper } from 'helpers';
const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/event`;

export const eventService = {

    create, 
    getAll,
    getById,
    getByStatus,
    changeStatus,
    update,
    getAllByEventId
    
};
async function create(event) {
	return await fetchWrapper.post(`${baseUrl}/create`, event);
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
	await fetchWrapper.get(`${baseUrl}/getByStatus/${id}`, status);
}

async function getAllByEventId(id) {
    return await fetchWrapper.get(`${baseUrl}/getAllByEventId/${id}`);
}