import { apiHandler } from "helpers/api"
import { eventsRepo } from "helpers/api"

export default apiHandler({
    get:getByStatus
})

async function getByStatus (req, res){
    let event = await eventsRepo.getByStatus(req.body)
    return res.status(200).json(event)
}