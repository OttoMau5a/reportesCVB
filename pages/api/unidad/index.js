import { unidadService } from "helpers/api";
import { apiHandler } from "helpers/api";

export default apiHandler({
    get: getAllUnidad
})

async function getAllUnidad(req, res) {
    let unidad = await unidadService.getAll()
    return res.status(200).json(unidad)
}