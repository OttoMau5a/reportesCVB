import { apiHandler } from 'helpers/api';
import { anexosRepo } from 'helpers/api';

export default apiHandler({
    get: getById,
    put:updatebyId

});
async function getById(req, res) {
    const anexos = await anexosRepo.getById(req.query.id);
    if (!anexos) return res.status(404).json({message: 'Relation Not Found'}) 
    return res.status(200).json(anexos);
}

async function updatebyId(req, res) {
    const anexos = await anexosRepo.update(req.query.id, req.body);
    if (!anexos) return res.status(404).json({message: 'Relation Not Found'}) 
    return res.status(200).json(anexos);
}
