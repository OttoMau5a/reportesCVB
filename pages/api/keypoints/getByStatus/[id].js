import { apiHandler } from "helpers/api"
import { keypointsRepo } from "helpers/api"

export default apiHandler({
    put:changeStatus
})

async function changeStatus (req, res){
    let keypoints = await keypointsRepo.changeStatus(req.query.id)
    return res.status(200).json(keypoints)
}