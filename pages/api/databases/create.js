import { databasesRepo } from "helpers/api";
import { apiHandler } from "helpers/api";

export default apiHandler({
    post:create
})

async function create(req, res)  {
    let databases = await databasesRepo.create(req.body)
    return res.status(200).json(databases)
}