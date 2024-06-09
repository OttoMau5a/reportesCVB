import { apiHandler } from 'helpers/api';
import { usersRepo } from 'helpers/api/users-repo';

export default apiHandler({
    
    put: changeStatus
});


async function changeStatus(req, res) {
    await usersRepo.changeStatus(req.query.id);
    return res.status(200).json({});
}
