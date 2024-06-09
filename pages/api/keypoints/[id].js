import { apiHandler } from 'helpers/api';
import { keypointsRepo } from 'helpers/api';

export default apiHandler({
    get: getById,
    put:updatebyId

});
async function getById(req, res) {
    const keypoints = await keypointsRepo.getById(req.query.id);
    if (!keypoints) return res.status(404).json({message: 'Relation Not Found'}) 
    return res.status(200).json(keypoints);
}

async function updatebyId(req, res) {
    const keypoints = await keypointsRepo.update(req.query.id, req.body);
    if (!keypoints) return res.status(404).json({message: 'Relation Not Found'}) 
    return res.status(200).json(keypoints);
}
