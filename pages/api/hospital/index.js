import { hospitalService } from "helpers/api";
import { apiHandler } from "helpers/api";

export default apiHandler({
    get: getAllHospital
})

async function getAllHospital(req, res) {
    let hospital = await hospitalService.getAll()
    return res.status(200).json(hospital)
}