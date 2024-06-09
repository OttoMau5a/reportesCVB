import { anexosRepo } from "helpers/api";
import { apiHandler } from "helpers/api";

export default apiHandler({
    get:getAllAnexos
})

async function getAllAnexos (req, res){
    let anexos = await anexosRepo.getAll()
    return res.status(200).json(anexos)
}