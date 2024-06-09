import { apiHandler } from "helpers/api"
import { clientRepo } from "helpers/api"

export default apiHandler({
    put:changeStatus
})

async function changeStatus (req, res){
    let client = await clientRepo.changeStatus(req.query.id)
    return res.status(200).json(client)
}