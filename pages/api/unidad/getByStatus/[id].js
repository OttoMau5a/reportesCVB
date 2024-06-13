import { apiHandler } from "helpers/api"
import { unidadService } from "helpers/api"

export default apiHandler({
    put: changeStatus
})

async function changeStatus(req, res) {
    let unidad = await unidadService.changeStatus(req.query.id)
    return res.status(200).json(unidad)
}