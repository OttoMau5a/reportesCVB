import { apiHandler } from "helpers/api"
import { personalService } from "helpers/api"

export default apiHandler({
    put: getByStatus
})

async function getByStatus(req, res) {
    let personal = await personalService.getByStatus(req.body)
    return res.status(200).json(personal)
}