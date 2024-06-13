import { typeServiceService } from "helpers/api";
import { apiHandler } from "helpers/api";

export default apiHandler({
    get: getAllTypeService
})

async function getAllTypeService(req, res) {
    let typeService = await typeServiceService.getAll()
    return res.status(200).json(typeService)
}