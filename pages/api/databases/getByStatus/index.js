import { apiHandler } from "helpers/api"
import { databasesRepo } from "helpers/api"

export default apiHandler({
    put:getByStatus
})

async function getByStatus (req, res){
    let databases = await databasesRepo.getByStatus(req.body)
    return res.status(200).json(databases)
}