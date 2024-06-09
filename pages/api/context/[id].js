import { apiHandler } from 'helpers/api';
import { contextRepo } from 'helpers/api';

export default apiHandler({
    get: getById,
    put:updatebyId

});
async function getById(req, res) {
    const context = await contextRepo.getById(req.query.id);
    if (!context) return res.status(404).json({message: 'Relation Not Found'}) 
    return res.status(200).json(context);
}

async function updatebyId(req, res) {
    const context = await contextRepo.update(req.query.id, req.body);
    if (!context) return res.status(404).json({message: 'Relation Not Found'}) 
    return res.status(200).json(context);
}
