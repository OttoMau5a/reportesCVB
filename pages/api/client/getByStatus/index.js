import { apiHandler } from "helpers/api"
import { clientRepo } from "helpers/api"

export default apiHandler({
    put:getByStatus
})

async function getByStatus (req, res){
    let client = await clientRepo.getByStatus(req.body)
    return res.status(200).json(client)
}