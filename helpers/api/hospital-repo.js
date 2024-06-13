import { db } from "./db";
const { Op } = require("sequelize");

export const hospitalRepo = {
    create,
    getAll,
    getById,
    getByStatus,
    update,
    changeStatus,
};

const hospitalDataReturn = ["id", "name", "status"];

async function create(params) {
    if (params.name === null || params.name === "" || params.name === undefined) {
        throw " La name es requerida";
    } else {
        let nameTrim = params.name.trim();

        if (await db.Hospital.findOne({ where: { name: nameTrim } })) {
            throw 'La name "' + params.name + '" ya existe"';
        }

        const hospital = new db.Hospital(params);
        let hospitalSaved = await hospital.save();

        let hospitalData = {
            id: hospitalSaved.id,
            name: hospitalSaved.name,
            status: hospitalSaved.status,
        };

        return hospitalData;
    }
}

async function getAll() {
    return await db.Hospital.findAll({ attributes: hospitalDataReturn });
}
async function getById(id) {
    return await db.Hospital.findOne({ where: { id: id } }, id, { attributes: hospitalDataReturn });
}

async function getByStatus({ status }) {
    console.log(status);
    let reports = await db.Hospital.findAll({
        where: { status: status },
        attributes: hospitalDataReturn,
        raw: true,
    });
    if (!reports || reports.length == 0) {
        return "hospital not found";
    }
    return reports;
}

async function update(_id, params) {
    const hospital = await db.Hospital.findByPk(_id);
    if (params.name === null || params.name === "" || params.name === undefined) {
        throw "La name es requerida";
    } else {
        if (!hospital) {
            throw "name no encontrada";
        }

        const nameTrim = params.name.trim();
        const nameExists = await db.Hospital.findOne({ where: { name: nameTrim, id: { [Op.not]: _id } } });

        if (nameExists) {
            throw `"La name '${params.name}' ya existe"`;
        }

        // If no conflicts, update the client
        Object.assign(hospital, params);
        await hospital.save();

        let hospitalData = {
            id: hospital.id,
            name: hospital.name,
            status: hospital.status,
        };
        return hospitalData;
    }
}

async function changeStatus(id) {
    const hospital = await db.Hospital.findByPk(id);
    if (!hospital) throw "hospital not found";
    if (hospital.status == false) {
        Object.assign(hospital, { status: true });
    } else {
        Object.assign(hospital, { status: false });
    }
    await hospital.save();

    let hospitalData = {
        id: hospital.id,
        name: hospital.name,
        status: hospital.status,
    };
    return hospitalData;
}