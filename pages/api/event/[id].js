import { apiHandler } from 'helpers/api';
import { eventsRepo } from 'helpers/api';

export default apiHandler({
    get: getById,
    put: update

});
async function getById(req, res) {
    const event = await eventsRepo.getById(req.query.id);
    if (!event) return res.status(404).json({message: 'Relation Not Found'}) 
    return res.status(200).json(event);
}

async function update(req, res) {
    const event = await eventsRepo.update(req.query.id, req.body);
    if (!event) return res.status(404).json({message: 'Relation Not Found'}) 
    return res.status(200).json(event);
}