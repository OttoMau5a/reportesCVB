import { apiHandler } from 'helpers/api';
import { personalService } from 'helpers/api';

export default apiHandler({
    get: getById,
    put: updatebyId

});
async function getById(req, res) {
    const personal = await personalService.getById(req.query.id);
    if (!personal) return res.status(404).json({ message: 'Relation Not Found' })
    return res.status(200).json(personal);
}

async function updatebyId(req, res) {
    const personal = await personalService.update(req.query.id, req.body);
    if (!personal) return res.status(404).json({ message: 'Relation Not Found' })
    return res.status(200).json(personal);
}
