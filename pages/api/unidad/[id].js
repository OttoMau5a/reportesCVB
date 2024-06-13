import { apiHandler } from 'helpers/api';
import { unidadService } from 'helpers/api';

export default apiHandler({
    get: getById,
    put: updatebyId

});
async function getById(req, res) {
    const unidad = await unidadService.getById(req.query.id);
    if (!unidad) return res.status(404).json({ message: 'Relation Not Found' })
    return res.status(200).json(unidad);
}

async function updatebyId(req, res) {
    const unidad = await unidadService.update(req.query.id, req.body);
    if (!unidad) return res.status(404).json({ message: 'Relation Not Found' })
    return res.status(200).json(unidad);
}
