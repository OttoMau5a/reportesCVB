import { apiHandler } from 'helpers/api';
import { databasesRepo } from 'helpers/api';

export default apiHandler({
    get: getById,
    put:updatebyId

});
async function getById(req, res) {
    const databases = await databasesRepo.getById(req.query.id);
    if (!databases) return res.status(404).json({message: 'Relation Not Found'}) 
    return res.status(200).json(databases);
}

async function updatebyId(req, res) {
    const databases = await databasesRepo.update(req.query.id, req.body);
    if (!databases) return res.status(404).json({message: 'Relation Not Found'}) 
    return res.status(200).json(databases);
}
