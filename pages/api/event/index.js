import { eventsRepo } from "helpers/api";
import { apiHandler } from "helpers/api";

export default apiHandler({
    get:getAll
})

async function getAll(req, res){
    let event = await eventsRepo.getAll()
    return res.status(200).json(event)
}