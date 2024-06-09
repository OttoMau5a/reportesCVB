import { apiHandler } from "helpers/api"
import { databasesRepo } from "helpers/api"

export default apiHandler({
    put:changeStatus
})

async function changeStatus (req, res){
    let databases = await databasesRepo.changeStatus(req.query.id)
    return res.status(200).json(databases)
}