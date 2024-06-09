import { apiHandler } from 'helpers/api';
import { targetsRepo } from 'helpers/api';

export default apiHandler({
    get: getById,
    put:updatebyId

});
async function getById(req, res) {
    const targets = await targetsRepo.getById(req.query.id);
    if (!targets) return res.status(404).json({message: 'Relation Not Found'}) 
    return res.status(200).json(targets);
}

async function updatebyId(req, res) {
    const targets = await targetsRepo.update(req.query.id, req.body);
    if (!targets) return res.status(404).json({message: 'Relation Not Found'}) 
    return res.status(200).json(targets);
}
