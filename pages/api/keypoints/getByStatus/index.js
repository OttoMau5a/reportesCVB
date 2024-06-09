import { apiHandler } from "helpers/api"
import { keypointsRepo } from "helpers/api"

export default apiHandler({
    put:getByStatus
})

async function getByStatus (req, res){
    let keypoints = await keypointsRepo.getByStatus(req.body)
    return res.status(200).json(keypoints)
}