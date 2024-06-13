import { db } from "./db";
const { Op } = require("sequelize");

export const unidadRepo = {
    create,
    getAll,
    getById,
    getByStatus,
    update,
    changeStatus,
};

const unidadDataReturn = ["id", "placa", "status"];

async function create(params) {
    if (params.placa === null || params.placa === "" || params.placa === undefined) {
        throw " La placa es requerida";
    } else {
        let placaTrim = params.placa.trim();

        if (await db.Unidad.findOne({ where: { placa: placaTrim } })) {
            throw 'La placa "' + params.placa + '" ya existe"';
        }

        const unidad = new db.Unidad(params);
        let unidadSaved = await unidad.save();

        let unidadData = {
            id: unidadSaved.id,
            placa: unidadSaved.placa,
            status: unidadSaved.status,
        };

        return unidadData;
    }
}

async function getAll() {
    return await db.Unidad.findAll({ attributes: unidadDataReturn });
}
async function getById(id) {
    return await db.Unidad.findOne({ where: { id: id } }, id, { attributes: unidadDataReturn });
}

async function getByStatus({ status }) {
    console.log(status);
    let reports = await db.Unidad.findAll({
        where: { status: status },
        attributes: unidadDataReturn,
        raw: true,
    });
    if (!reports || reports.length == 0) {
        return "Unidad not found";
    }
    return reports;
}

async function update(_id, params) {
    const unidad = await db.Unidad.findByPk(_id);
    if (params.placa === null || params.placa === "" || params.placa === undefined) {
        throw "La placa es requerida";
    } else {
        if (!unidad) {
            throw "Placa no encontrada";
        }

        const placaTrim = params.placa.trim();
        const placaExists = await db.Unidad.findOne({ where: { placa: placaTrim, id: { [Op.not]: _id } } });

        if (placaExists) {
            throw `"La placa '${params.placa}' ya existe"`;
        }

        // If no conflicts, update the client
        Object.assign(unidad, params);
        await unidad.save();

        let unidadData = {
            id: unidad.id,
            placa: unidad.placa,
            status: unidad.status,
        };
        return unidadData;
    }
}

async function changeStatus(id) {
    const unidad = await db.Unidad.findByPk(id);
    if (!unidad) throw "unidad not found";
    if (unidad.status == false) {
        Object.assign(unidad, { status: true });
    } else {
        Object.assign(unidad, { status: false });
    }
    await unidad.save();

    let unidadData = {
        id: unidad.id,
        placa: unidad.placa,
        status: unidad.status,
    };
    return unidadData;
}