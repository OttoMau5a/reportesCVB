import { apiHandler } from "helpers/api"
import { hospitalService } from "helpers/api"

export default apiHandler({
    put: getByStatus
})

async function getByStatus(req, res) {
    let hospital = await hospitalService.getByStatus(req.body)
    return res.status(200).json(hospital)
}