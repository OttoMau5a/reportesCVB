import { apiHandler } from "helpers/api"
import { typeServiceService } from "helpers/api"

export default apiHandler({
    put: getByStatus
})

async function getByStatus(req, res) {
    let typeService = await typeServiceService.getByStatus(req.body)
    return res.status(200).json(typeService)
}