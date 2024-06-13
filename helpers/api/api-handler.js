import { db, errorHandler, jwtMiddleware} from 'helpers/api';
import { targetTypeRepo } from './targetType-repo';
import { rangoRepo } from './rango-repo';
import { typeUnidadRepo } from './typeUnidad-repo';

export { apiHandler };

function apiHandler(handler) {
    return async (req, res) => {
        const method = req.method.toLowerCase();

        // check handler supports HTTP method
        if (!handler[method])
            return res.status(405).end(`Method ${req.method} Not Allowed`);

        try {
            // init db if required
            if (!db.initialized)
                await db.initialize();

            // global middleware
            await jwtMiddleware(req, res);
            rangoRepo.create();
            typeUnidadRepo.create();
            // route handler
            await handler[method](req, res);
        } catch (err) {
            // global error handler
            errorHandler(err, res);
        }
    }
}