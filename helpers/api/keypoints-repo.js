
import { count } from "rxjs";
import { db } from "./db";
const { Op } = require("sequelize");


export const keypointsRepo = {
    create,
    getAll,
    getById,
    getByStatus,
    update,
    changeStatus
};

const keypointsDataReturn = ['id', 'imageURL', 'countInvitados','countAsistentesReales','countIndustrias','countSatisfaccion', 'countPromotor','countPasivo','countDetractor','countNPS', 'status'];

async function create(params) {

    const Keypoints = new db.Keypoints(params);
    let KeypointsSaved = await Keypoints.save();

    let KeypointsData = {
        id: KeypointsSaved.id,
        imageURL: KeypointsSaved.imageURL,
        countInvitados: KeypointsSaved.countInvitados,
        countAsistentesReales: KeypointsSaved.countAsistentesReales,
        countIndustrias: KeypointsSaved.countIndustrias,
        countSatisfaccion: KeypointsSaved.countSatisfaccion,
        countPromotor: KeypointsSaved.countPromotor,
        countPasivo: KeypointsSaved.countPasivo,
        countDetractor: KeypointsSaved.countDetractor,
        countNPS: KeypointsSaved.countNPS,
        status: KeypointsSaved.status
    };

    return KeypointsData

}

async function getAll() {
    return await db.Keypoints.findAll({ attributes: keypointsDataReturn });
}
async function getById(id) {
    return await db.Keypoints.findOne({ where: { id: id } },
        id,
        { attributes: keypointsDataReturn }
    );
}

async function getByStatus({ status }) {
    console.log(status)
    let reports = await db.Keypoints.findAll({
        where: { status: status },
        attributes: keypointsDataReturn,
        raw: true,
    });
    if (!reports || reports.length == 0) {
        return "Keypoints not found";
    }
    return reports;
}

async function update(_id, params) {
    const Keypoints = await db.Keypoints.findByPk(_id);
    // If no conflicts, update the Keypoints
    Object.assign(Keypoints, params);
    await Keypoints.save();

    let KeypointsData = {
        id: Keypoints.id,
        keypointImageURL: Keypoints.keypointImageURL,
        countInvitados: Keypoints.countInvitados,
        countAsistentesReales: Keypoints.countAsistentesReales,
        countIndustrias: Keypoints.countIndustrias,
        countSatisfaccion: Keypoints.countSatisfaccion,
        countPromotor: Keypoints.countPromotor,
        countPasivo: Keypoints.countPasivo,
        countDetractor: Keypoints.countDetractor,
        countNPS: Keypoints.countNPS,
        status: Keypoints.status
    };
    return KeypointsData

}

async function changeStatus(id) {
    const Keypoints = await db.Keypoints.findByPk(id);
    if (!Keypoints) throw "Keypoints not found";
    if (Keypoints.status == false) {
        Object.assign(Keypoints, { status: true });
    } else {
        Object.assign(Keypoints, { status: false });
    }
    await Keypoints.save();

    let KeypointsData = {
        id: Keypoints.id,
        keypointImageURL: Keypoints.keypointImageURL,
        countInvitados: Keypoints.countInvitados,
        countAsistentesReales: Keypoints.countAsistentesReales,
        countIndustrias: Keypoints.countIndustrias,
        countSatisfaccion: Keypoints.countSatisfaccion,
        countPromotor: Keypoints.countPromotor,
        countPasivo: Keypoints.countPasivo,
        countDetractor: Keypoints.countDetractor,
        countNPS: Keypoints.countNPS,
        status: Keypoints.status
    };
    return KeypointsData
}
