
import { db } from "./db";
const { Op, where } = require("sequelize");


export const eventsRepo = {
    create,
    getAll,
    getById,
    getByStatus,
    update,
    changeStatus,
    getAllByEventId,
};

const eventsDataReturn = ['id', 'name', 'status'];
const contextDataReturn = ['id', 'imageURL', 'introduction','eventFormat', 'fecha', 'lugar', 'hora', 'status'];
const dataBasesDataReturn = ['id', 'imageURLPreview','imageURLQR', 'status'];
const keypointsDataReturn = ['id', 'imageURL', 'countInvitados','countAsistentesReales','countIndustrias','countSatisfaccion', 'countPromotor','countPasivo','countDetractor','countNPS', 'status'];
const anexosDataReturn = ['id','imageURLSaveTheDate','imageURLInvitacionOficial','imageURLFotoEvento1','imageURLFotoEvento2','imageURLFotoEvento3','imageURLFotoEvento4','imageURLFotoEvento5','imageURLFotoEvento6','imageURLFotoEvento7','imageURLFotoEvento8','imageURLPromocionales','imageURLMaterialImpreso','status'];


async function create(params) {
    if (
        params.name === null || params.name === "" || params.name === undefined
    ) {
        throw " name is required";
    } else {

        const Event = new db.Event(params);
        let EventSaved = await Event.save();

        let EventData = {
            id: EventSaved.id,
            name: EventSaved.name,
            status: EventSaved.status

        };

        return EventData
    }
}

async function getAll() {
    return await db.Event.findAll({
        attributes: eventsDataReturn,
        include: [
            {
                model: db.Client,
                attributes: ['id', 'name'],
            },
        ],
    });
}
async function getById(id) {
    return await db.Event.findOne({ where: { id: id } },
        id,
        { attributes: eventsDataReturn }
    );
}

async function getByStatus({ status }) {
    console.log(status)
    let reports = await db.Event.findAll({
        where: { status: status },
        attributes: eventsDataReturn,
        raw: true,
    });
    if (!reports || reports.length == 0) {
        return "Event not found";
    }
    return reports;
}

async function update(_id, params) {
    const Event = await db.Event.findByPk(_id);
    if (
        params.name === null || params.name === "" || params.name === undefined
    ) {
        throw " name are required";
    } else {
        if (!Event) {
            throw "Event not found";
        }

        // If no conflicts, update the Event
        Object.assign(Event, params);
        await Event.save();

        let EventData = {
            id: Event.id,
            name: Event.name,
            status: Event.status

        };
        return EventData
    }
}

async function changeStatus(id) {
    const Event = await db.Event.findByPk(id);
    if (!Event) throw "Event not found";
    if (Event.status == false) {
        Object.assign(Event, { status: true });
    } else {
        Object.assign(Event, { status: false });
    }
    await Event.save();

    let EventData = {
        id: Event.id,
        name: Event.name,
        status: Event.status

    };
    return EventData
}

async function getAllByEventId(id) {
    let event = await db.Event.findAll({
        where: { id: id },
        attributes: eventsDataReturn,
        include: [
            {
                model: db.Client,
                attributes: ['id', 'name', 'logo'],
            },
            {
                model: db.Context,
                attributes: contextDataReturn,
            },
            {
                model: db.Target,
                attributes: ['id', 'name', 'count'],
                include: [
                    {
                        model: db.TargetType,
                        attributes: ['id', 'name'],
                    },
                ],
            },
            {
                model: db.Keypoints,
                attributes: keypointsDataReturn,
            },
            {
                model: db.Anexos,
                attributes: anexosDataReturn,
            },
            {
                model: db.DataBase,
                attributes: dataBasesDataReturn,
            },
        ],
    });
    if (!event || event.length == 0) {
        return "Event not found";
    }
    return event;
}
