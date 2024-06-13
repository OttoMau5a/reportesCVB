import { apiHandler } from 'helpers/api';
import { hospitalService } from 'helpers/api';

export default apiHandler({
    get: getById,
    put: updatebyId

});
async function getById(req, res) {
    const hospital = await hospitalService.getById(req.query.id);
    if (!hospital) return res.status(404).json({ message: 'Relation Not Found' })
    return res.status(200).json(hospital);
}

async function updatebyId(req, res) {
    const hospital = await hospitalService.update(req.query.id, req.body);
    if (!hospital) return res.status(404).json({ message: 'Relation Not Found' })
    return res.status(200).json(hospital);
}
