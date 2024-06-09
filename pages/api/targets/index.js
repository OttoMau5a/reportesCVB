import { targetsRepo } from "helpers/api";
import { apiHandler } from "helpers/api";

export default apiHandler({
    get:getAllTargets
})

async function getAllTargets (req, res){
    let targets = await targetsRepo.getAll()
    return res.status(200).json(targets)
}