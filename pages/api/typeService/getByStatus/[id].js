import { apiHandler } from "helpers/api"
import { typeServiceService } from "helpers/api"

export default apiHandler({
    put: changeStatus
})

async function changeStatus(req, res) {
    let typeService = await typeServiceService.changeStatus(req.query.id)
    return res.status(200).json(typeService)
}