import { contextRepo } from "helpers/api/context-repo";
import { apiHandler } from "helpers/api";

export default apiHandler({
    post:create
})

async function create(req, res)  {
    let context = await contextRepo.create(req.body)
    return res.status(200).json(context)
}