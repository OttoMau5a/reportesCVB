import { apiHandler } from "helpers/api"
import { hospitalService } from "helpers/api"

export default apiHandler({
    put: changeStatus
})

async function changeStatus(req, res) {
    let hospital = await hospitalService.changeStatus(req.query.id)
    return res.status(200).json(hospital)
}