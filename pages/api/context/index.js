import { contextRepo } from "helpers/api/context-repo";
import { apiHandler } from "helpers/api";

export default apiHandler({
    get:getAllContexts
})

async function getAllContexts (req, res){
    let context = await contextRepo.getAll()
    return res.status(200).json(context)
}