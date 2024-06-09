import { apiHandler } from "helpers/api"
import { contextRepo } from "helpers/api"

export default apiHandler({
    put:changeStatus
})

async function changeStatus (req, res){
    let context = await contextRepo.changeStatus(req.query.id)
    return res.status(200).json(context)
}