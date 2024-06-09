import { apiHandler } from "helpers/api"
import { targetsRepo } from "helpers/api"

export default apiHandler({
    put:changeStatus
})

async function changeStatus (req, res){
    let targets = await targetsRepo.changeStatus(req.query.id)
    return res.status(200).json(targets)
}