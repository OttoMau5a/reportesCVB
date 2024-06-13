import { personalService } from "helpers/api";
import { apiHandler } from "helpers/api";

export default apiHandler({
    get: getAllPersonal
})

async function getAllPersonal(req, res) {
    let personal = await personalService.getAll()
    return res.status(200).json(personal)
}