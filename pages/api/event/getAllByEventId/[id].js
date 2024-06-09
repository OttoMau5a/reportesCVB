import { apiHandler } from 'helpers/api';
import { eventsRepo } from 'helpers/api/';
export default apiHandler({
    get: getAllByEventId
});
async function getAllByEventId(req, res) {
    const event = await eventsRepo.getAllByEventId(req.query.id);
    if (!event) throw 'Event not found';
    return res.status(200).json(event);
}
