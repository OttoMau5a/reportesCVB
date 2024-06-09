
import { db } from "./db";
const { Op } = require("sequelize");


export const anexosRepo = {
    create,
    getAll,
    getById,
    getByStatus,
    update,
    changeStatus
};

const anexosDataReturn = ['id', 'imageURLSaveTheDate', 'imageURLInvitacionOficial', 'imageURLFotoEvento1', 'imageURLFotoEvento2', 'imageURLFotoEvento3', 'imageURLFotoEvento4', 'imageURLFotoEvento5', 'imageURLFotoEvento6', 'imageURLFotoEvento7', 'imageURLFotoEvento8', 'imageURLPromocionales', 'imageURLMaterialImpreso', 'status'];
async function create(params) {


    const Anexos = new db.Anexos(params);
    let AnexosSaved = await Anexos.save();

    let AnexosData = {
        id: AnexosSaved.id,
        imageURLSaveTheDate: AnexosSaved.imageURLSaveTheDate,
        imageURLInvitacionOficial: AnexosSaved.imageURLInvitacionOficial,
        imageURLFotoEvento1: AnexosSaved.imageURLFotoEvento1,
        imageURLFotoEvento2: AnexosSaved.imageURLFotoEvento2,
        imageURLFotoEvento3: AnexosSaved.imageURLFotoEvento3,
        imageURLFotoEvento4: AnexosSaved.imageURLFotoEvento4,
        imageURLFotoEvento5: AnexosSaved.imageURLFotoEvento5,
        imageURLFotoEvento6: AnexosSaved.imageURLFotoEvento6,
        imageURLFotoEvento7: AnexosSaved.imageURLFotoEvento7,
        imageURLFotoEvento8: AnexosSaved.imageURLFotoEvento8,
        imageURLPromocionales: AnexosSaved.imageURLPromocionales,
        imageURLMaterialImpreso: AnexosSaved.imageURLMaterialImpreso,
        status: AnexosSaved.status

    };

    return AnexosData

}

async function getAll() {
    return await db.Anexos.findAll({ attributes: anexosDataReturn });
}
async function getById(id) {
    return await db.Anexos.findOne({ where: { id: id } },
        id,
        { attributes: anexosDataReturn }
    );
}

async function getByStatus({ status }) {
    console.log(status)
    let reports = await db.Anexos.findAll({
        where: { status: status },
        attributes: anexosDataReturn,
        raw: true,
    });
    if (!reports || reports.length == 0) {
        return "Anexos not found";
    }
    return reports;
}

async function update(_id, params) {
    const Anexos = await db.Anexos.findByPk(_id);

    if (!Anexos) {
        throw "Anexos not found";
    }

    // If no conflicts, update the Anexos
    Object.assign(Anexos, params);
    await Anexos.save();

    let AnexosData = {
        id: Anexos.id,
        imageURLSaveTheDate: Anexos.imageURLSaveTheDate,
        imageURLInvitacionOficial: Anexos.imageURLInvitacionOficial,
        imageURLFotoEvento1: Anexos.imageURLFotoEvento1,
        imageURLFotoEvento2: Anexos.imageURLFotoEvento2,
        imageURLFotoEvento3: Anexos.imageURLFotoEvento3,
        imageURLFotoEvento4: Anexos.imageURLFotoEvento4,
        imageURLFotoEvento5: Anexos.imageURLFotoEvento5,
        imageURLFotoEvento6: Anexos.imageURLFotoEvento6,
        imageURLFotoEvento7: Anexos.imageURLFotoEvento7,
        imageURLFotoEvento8: Anexos.imageURLFotoEvento8,
        imageURLPromocionales: Anexos.imageURLPromocionales,
        imageURLMaterialImpreso: Anexos.imageURLMaterialImpreso,
        status: Anexos.status
    };
    return AnexosData

}

async function changeStatus(id) {
    const Anexos = await db.Anexos.findByPk(id);
    if (!Anexos) throw "Anexos not found";
    if (Anexos.status == false) {
        Object.assign(Anexos, { status: true });
    } else {
        Object.assign(Anexos, { status: false });
    }
    await Anexos.save();

    let AnexosData = {
        id: Anexos.id,
        imageURLSaveTheDate: Anexos.imageURLSaveTheDate,
        imageURLInvitacionOficial: Anexos.imageURLInvitacionOficial,
        imageURLFotoEvento1: Anexos.imageURLFotoEvento1,
        imageURLFotoEvento2: Anexos.imageURLFotoEvento2,
        imageURLFotoEvento3: Anexos.imageURLFotoEvento3,
        imageURLFotoEvento4: Anexos.imageURLFotoEvento4,
        imageURLFotoEvento5: Anexos.imageURLFotoEvento5,
        imageURLFotoEvento6: Anexos.imageURLFotoEvento6,
        imageURLFotoEvento7: Anexos.imageURLFotoEvento7,
        imageURLFotoEvento8: Anexos.imageURLFotoEvento8,
        imageURLPromocionales: Anexos.imageURLPromocionales,
        imageURLMaterialImpreso: Anexos.imageURLMaterialImpreso,
        status: Anexos.status
    };
    return AnexosData
}
