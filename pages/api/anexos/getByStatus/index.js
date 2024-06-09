import { apiHandler } from "helpers/api"
import { anexosRepo } from "helpers/api"

export default apiHandler({
    put:getByStatus
})

async function getByStatus (req, res){
    let anexos = await anexosRepo.getByStatus(req.body)
    return res.status(200).json(anexos)
}