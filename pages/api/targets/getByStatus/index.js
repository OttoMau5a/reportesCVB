import { apiHandler } from "helpers/api"
import { targetsRepo } from "helpers/api"

export default apiHandler({
    put:getByStatus
})

async function getByStatus (req, res){
    let targets = await targetsRepo.getByStatus(req.body)
    return res.status(200).json(targets)
}