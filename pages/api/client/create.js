import { clientRepo } from "helpers/api/client-repo";
import { apiHandler } from "helpers/api";

export default apiHandler({
    post:create
})

async function create(req, res)  {
    let client = await clientRepo.create(req.body)
    return res.status(200).json(client)
}