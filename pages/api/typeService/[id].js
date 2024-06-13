import { apiHandler } from 'helpers/api';
import { typeServiceService } from 'helpers/api';

export default apiHandler({
    get: getById,
    put: updatebyId

});
async function getById(req, res) {
    const typeService = await typeServiceService.getById(req.query.id);
    if (!typeService) return res.status(404).json({ message: 'Relation Not Found' })
    return res.status(200).json(typeService);
}

async function updatebyId(req, res) {
    const typeService = await typeServiceService.update(req.query.id, req.body);
    if (!typeService) return res.status(404).json({ message: 'Relation Not Found' })
    return res.status(200).json(typeService);
}
