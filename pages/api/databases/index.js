import { databasesRepo } from "helpers/api";
import { apiHandler } from "helpers/api";

export default apiHandler({
    get:getAllDataBases
})

async function getAllDataBases (req, res){
    let databases = await databasesRepo.getAll()
    return res.status(200).json(databases)
}