import { clientRepo } from "helpers/api/client-repo";
import { apiHandler } from "helpers/api";

export default apiHandler({
    get:getAllClients
})

async function getAllClients (req, res){
    let client = await clientRepo.getAll()
    return res.status(200).json(client)
}