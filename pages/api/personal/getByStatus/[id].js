import { apiHandler } from "helpers/api"
import { personalService } from "helpers/api"

export default apiHandler({
    put: changeStatus
})

async function changeStatus(req, res) {
    let personal = await personalService.changeStatus(req.query.id)
    return res.status(200).json(personal)
}