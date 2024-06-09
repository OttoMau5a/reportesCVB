
import { db } from "./db";
const { Op } = require("sequelize");


export const databasesRepo = {
    create,
    getAll,
    getById,
    getByStatus,
    update,
    changeStatus
};

const dataBasesDataReturn = ['id', 'imageURLPreview', 'imageURLQR', 'status'];

async function create(params) {


    const DataBase = new db.DataBase(params);
    let DataBaseSaved = await DataBase.save();

    let DataBaseData = {
        id: DataBaseSaved.id,
        imageURLPreview: DataBaseSaved.imageURLPreview,
        imageURLQR: DataBaseSaved.imageURLQR,
        status: DataBaseSaved.status

    };

    return DataBaseData

}

async function getAll() {
    return await db.DataBase.findAll({ attributes: dataBasesDataReturn });
}
async function getById(id) {
    return await db.DataBase.findOne({ where: { id: id } },
        id,
        { attributes: dataBasesDataReturn }
    );
}

async function getByStatus({ status }) {
    console.log(status)
    let reports = await db.DataBase.findAll({
        where: { status: status },
        attributes: dataBasesDataReturn,
        raw: true,
    });
    if (!reports || reports.length == 0) {
        return "DataBase not found";
    }
    return reports;
}

async function update(_id, params) {
    const DataBase = await db.DataBase.findByPk(_id);

    if (!DataBase) {
        throw "DataBase not found";
    }

    // If no conflicts, update the DataBase
    Object.assign(DataBase, params);
    await DataBase.save();

    let DataBaseData = {
        id: DataBase.id,
        imageURLPreview: DataBase.imageURLPreview,
        imageURLQR: DataBase.imageURLQR,
        status: DataBase.status

    };
    return DataBaseData

}

async function changeStatus(id) {
    const DataBase = await db.DataBase.findByPk(id);
    if (!DataBase) throw "DataBase not found";
    if (DataBase.status == false) {
        Object.assign(DataBase, { status: true });
    } else {
        Object.assign(DataBase, { status: false });
    }
    await DataBase.save();

    let DataBaseData = {
        id: DataBase.id,
        imageURLPreview: DataBase.imageURLPreview,
        imageURLQR: DataBase.imageURLQR,
        status: DataBase.status

    };
    return DataBaseData
}
