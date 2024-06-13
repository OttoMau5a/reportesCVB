import { db } from "./db";
const { Op } = require("sequelize");

export const typeServiceRepo = {
    create,
    getAll,
    getById,
    getByStatus,
    update,
    changeStatus,
};

const typeServiceDataReturn = ["id", "name", "status"];

async function create(params) {
    if (params.name === null || params.name === "" || params.name === undefined) {
        throw "El nombre del servicio es requerido";
    } else {
        let nameTrim = params.name.trim();

        if (await db.TypeService.findOne({ where: { name: nameTrim } })) {
            throw 'La name "' + params.name + '" ya existe"';
        }

        const typeService = new db.TypeService(params);
        let typeServiceSaved = await typeService.save();

        let typeServiceData = {
            id: typeServiceSaved.id,
            name: typeServiceSaved.name,
            status: typeServiceSaved.status,
        };

        return typeServiceData;
    }
}

async function getAll() {
    return await db.TypeService.findAll({ attributes: typeServiceDataReturn });
}
async function getById(id) {
    return await db.TypeService.findOne({ where: { id: id } }, id, { attributes: typeServiceDataReturn });
}

async function getByStatus({ status }) {
    console.log(status);
    let reports = await db.TypeService.findAll({
        where: { status: status },
        attributes: typeServiceDataReturn,
        raw: true,
    });
    if (!reports || reports.length == 0) {
        return "Servicio not found";
    }
    return reports;
}

async function update(_id, params) {
    const typeService = await db.TypeService.findByPk(_id);
    if (params.name === null || params.name === "" || params.name === undefined) {
        throw "La name es requerida";
    } else {
        if (!typeService) {
            throw "name no encontrada";
        }

        const nameTrim = params.name.trim();
        const nameExists = await db.TypeService.findOne({ where: { name: nameTrim, id: { [Op.not]: _id } } });

        if (nameExists) {
            throw `"El servicio '${params.name}' ya existe"`;
        }

        // If no conflicts, update the client
        Object.assign(typeService, params);
        await typeService.save();

        let typeServiceData = {
            id: typeService.id,
            name: typeService.name,
            status: typeService.status,
        };
        return typeServiceData;
    }
}

async function changeStatus(id) {
    const typeService = await db.TypeService.findByPk(id);
    if (!typeService) throw "typeService not found";
    if (typeService.status == false) {
        Object.assign(typeService, { status: true });
    } else {
        Object.assign(typeService, { status: false });
    }
    await typeService.save();

    let typeServiceData = {
        id: typeService.id,
        name: typeService.name,
        status: typeService.status,
    };
    return typeServiceData;
}