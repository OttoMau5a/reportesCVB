import { apiHandler } from "helpers/api"
import { eventsRepo } from "helpers/api"

export default apiHandler({
    put:changeStatus
})

async function changeStatus (req, res){
    let event = await eventsRepo.changeStatus(req.query.id)
    return res.status(200).json(event)
}