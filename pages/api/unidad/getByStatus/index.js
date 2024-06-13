import { apiHandler } from "helpers/api"
import { unidadService } from "helpers/api"

export default apiHandler({
    put: getByStatus
})

async function getByStatus(req, res) {
    let unidad = await unidadService.getByStatus(req.body)
    return res.status(200).json(unidad)
}