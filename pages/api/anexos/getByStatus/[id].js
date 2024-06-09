import { apiHandler } from "helpers/api"
import { anexosRepo } from "helpers/api"

export default apiHandler({
    put:changeStatus
})

async function changeStatus (req, res){
    let anexos = await anexosRepo.changeStatus(req.query.id)
    return res.status(200).json(anexos)
}