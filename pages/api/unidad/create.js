import { unidadService } from "helpers/api";
import { apiHandler } from "helpers/api";

export default apiHandler({
    post: create
})

async function create(req, res) {
    let unidad = await unidadService.create(req.body)
    return res.status(200).json(unidad)
}