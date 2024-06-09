import { keypointsRepo } from "helpers/api";
import { apiHandler } from "helpers/api";

export default apiHandler({
    get:getAllKeypoints
})

async function getAllKeypoints (req, res){
    let keypoints = await keypointsRepo.getAll()
    return res.status(200).json(keypoints)
}