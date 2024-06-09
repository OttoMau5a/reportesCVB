import { db } from "./db";
const { Op } = require("sequelize");

export const targetsRepo = {
	create,
	getAll,
	getById,
	getByStatus,
	update,
	changeStatus,
};

const targetsDataReturn = ["id", "name", "count", "status", "TargetTypeId"];

async function create(params) {

	const Target = new db.Target(params);
	let TargetSaved = await Target.save();

	let TargetData = {
		id: TargetSaved.id,
		name: TargetSaved.name,
		count: TargetSaved.count,
		status: TargetSaved.status,
		TargetTypeId: TargetSaved.TargetTypeId,
	};

	return TargetData;

}

async function getAll() {
	return await db.Target.findAll({ attributes: targetsDataReturn });
}

async function getById(id) {
	return await db.Target.findOne({ where: { id: id }, attributes: targetsDataReturn });
}

async function getByStatus({ status }) {
	console.log(status);
	let reports = await db.Target.findAll({
		where: { status: status },
		attributes: targetsDataReturn,
		raw: true,
	});
	if (!reports || reports.length === 0) {
		return "Target not found";
	}
	return reports;
}

async function update(_id, params) {
	const Target = await db.Target.findByPk(_id);

	if (!Target) {
		throw "Target not found";
	}

	// If no conflicts, update the Target
	Object.assign(Target, params);
	await Target.save();

	let TargetData = {
		id: Target.id,
		name: Target.name,
		count: Target.count,
		status: Target.status,
		TargetTypeId: Target.TargetTypeId,
	};
	return TargetData;

}

async function changeStatus(id) {
	const Target = await db.Target.findByPk(id);
	if (!Target) throw "Target not found";
	if (Target.status === false) {
		Object.assign(Target, { status: true });
	} else {
		Object.assign(Target, { status: false });
	}
	await Target.save();

	let TargetData = {
		id: Target.id,
		name: Target.name,
		count: Target.count,
		status: Target.status,
		TargetTypeId: Target.TargetTypeId,
	};
	return TargetData;
}
