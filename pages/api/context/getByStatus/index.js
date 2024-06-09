import { apiHandler } from "helpers/api"
import { contextRepo } from "helpers/api"

export default apiHandler({
    put:getByStatus
})

async function getByStatus (req, res){
    let context = await contextRepo.getByStatus(req.body)
    return res.status(200).json(context)
}