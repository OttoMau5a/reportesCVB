
import { db } from "./db";
const { Op } = require("sequelize");


export const contextRepo = {
    create,
    getAll,
    getById,
    getByStatus,
    update,
    changeStatus
};

const contextDataReturn = ['id', 'imageURL', 'introduction', 'eventFormat', 'fecha', 'lugar', 'hora', 'status'];

async function create(params) {


    const Context = new db.Context(params);
    let ContextSaved = await Context.save();

    let ContextData = {
        id: ContextSaved.id,
        imageURL: ContextSaved.imageURL,
        introduction: ContextSaved.introduction,
        eventFormat: ContextSaved.eventFormat,
        fecha: ContextSaved.fecha,
        lugar: ContextSaved.lugar,
        hora: ContextSaved.hora,
        status: ContextSaved.status

    };

    return ContextData

}

async function getAll() {
    return await db.Context.findAll({ attributes: contextDataReturn });
}
async function getById(id) {
    return await db.Context.findOne({ where: { id: id } },
        id,
        { attributes: contextDataReturn }
    );
}

async function getByStatus({ status }) {
    console.log(status)
    let reports = await db.Context.findAll({
        where: { status: status },
        attributes: contextDataReturn,
        raw: true,
    });
    if (!reports || reports.length == 0) {
        return "Context not found";
    }
    return reports;
}

async function update(_id, params) {
    const Context = await db.Context.findByPk(_id);

    if (!Context) {
        throw "Context not found";
    }

    // If no conflicts, update the Context
    Object.assign(Context, params);
    await Context.save();

    let ContextData = {
        id: Context.id,
        imageURL: Context.imageURL,
        introduction: Context.introduction,
        eventFormat: Context.eventFormat,
        fecha: Context.fecha,
        lugar: Context.lugar,
        hora: Context.hora,
        status: Context.status

    };
    return ContextData

}

async function changeStatus(id) {
    const Context = await db.Context.findByPk(id);
    if (!Context) throw "Context not found";
    if (Context.status == false) {
        Object.assign(Context, { status: true });
    } else {
        Object.assign(Context, { status: false });
    }
    await Context.save();

    let ContextData = {
        id: Context.id,
        imageURL: Context.imageURL,
        introduction: Context.introduction,
        eventFormat: Context.eventFormat,
        fecha: Context.fecha,
        lugar: Context.lugar,
        hora: Context.hora,
        status: Context.status

    };
    return ContextData
}
