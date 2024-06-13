import { hospitalService } from "helpers/api";
import { apiHandler } from "helpers/api";

export default apiHandler({
    post: create
})

async function create(req, res) {
    let hospital = await hospitalService.create(req.body)
    return res.status(200).json(hospital)
}