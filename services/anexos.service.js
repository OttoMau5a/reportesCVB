
import getConfig from 'next/config';
import { fetchWrapper } from 'helpers';
const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/anexos`;

export const anexosService = {

    create,
    getAll,
    getById,
    update,
    changeStatus,
    getByStatus
};
async function create(anexos) {
    return await fetchWrapper.post(`${baseUrl}/create`, anexos);
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
    await fetchWrapper.put(`${baseUrl}/getByStatus/${id}`)
}

async function getByStatus(status){
    console.log(status)
  return await fetchWrapper.put(`${baseUrl}/getByStatus`, {status:status})
}