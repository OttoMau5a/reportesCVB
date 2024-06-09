import { apiHandler } from 'helpers/api';
import { clientRepo } from 'helpers/api';

export default apiHandler({
    get: getById,
    put:updatebyId

});
async function getById(req, res) {
    const client = await clientRepo.getById(req.query.id);
    if (!client) return res.status(404).json({message: 'Relation Not Found'}) 
    return res.status(200).json(client);
}

async function updatebyId(req, res) {
    const client = await clientRepo.update(req.query.id, req.body);
    if (!client) return res.status(404).json({message: 'Relation Not Found'}) 
    return res.status(200).json(client);
}
