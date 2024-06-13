import { db } from "./db";
const { Op } = require("sequelize");

export const personalRepo = {
	create,
	getAll,
	getById,
	getByStatus,
	update,
	changeStatus,
};

const personaDataReturn = ["id", "name", "lastName", "userName", "phone", "carne", "status"];

async function create(params) {
	if (params.name === null || params.name === "" || params.name === undefined
		|| params.lastName === null || params.lastName === "" || params.lastName === undefined
		|| params.userName === null || params.userName === "" || params.userName === undefined
	) {
		throw "Nombre, Apellido y userName son requeridos";
	}else {
		let nameTrim = params.userName.trim();

		if (await db.Personal.findOne({ where: { userName: nameTrim } })) {
			throw 'El bombero "' + params.name + '"ya existe"';
		}

		const personal = new db.Personal(params);
		let personalSaved = await personal.save();

		let personalData = {
			id: personalSaved.id,
			name: personalSaved.name,
			lastName: personalSaved.lastName,
			userName: personalSaved.userName,
			phone: personalSaved.phone,
			carne: personalSaved.carne,
			status: personalSaved.status,
		};

		return personalData;
	}
}

async function getAll() {
	return await db.Personal.findAll({ attributes: personaDataReturn });
}
async function getById(id) {
	return await db.Personal.findOne({ where: { id: id } }, id, { attributes: personaDataReturn });
}

async function getByStatus({ status }) {
	console.log(status);
	let reports = await db.Personal.findAll({
		where: { status: status },
		attributes: personaDataReturn,
		raw: true,
	});
	if (!reports || reports.length == 0) {
		return "Personal no encontrado";
	}
	return reports;
}

async function update(_id, params) {
	const personal = await db.Personal.findByPk(_id);
	if (params.name === null || params.name === "" || params.name === undefined
		|| params.lastName === null || params.lastName === "" || params.lastName === undefined
		|| params.userName === null || params.userName === "" || params.userName
	) {
		throw "Nombre, Apellido y userName son requeridos";
	} else {
		if (!personal) {
			throw "Personal no encontrado";
		}

		const nameTrim = params.userName.trim();
		const nameExists = await db.Personal.findOne({ where: { userName: nameTrim, id: { [Op.not]: _id } } });

		if (nameExists) {
			throw `"Username del bombero '${params.name}' ya existe"`;
		}

		// If no conflicts, update the client
		Object.assign(personal, params);
		await personal.save();

		let personalData = {
			id: personal.id,
			name: personal.name,
			lastName: personal.lastName,
			userName: personal.userName,
			phone: personal.phone,
			carne: personal.carne,
			status: personal.status,
		};
		return personalData;
	}
}

async function changeStatus(id) {
	const personal = await db.Personal.findByPk(id);
	if (!personal) throw "Bombero no encontrado";
	if (personal.status == false) {
		Object.assign(personal, { status: true });
	} else {
		Object.assign(personal, { status: false });
	}
	await personal.save();

	let personalData = {
		id: personal.id,
		name: personal.name,
		lastName: personal.lastName,
		userName: personal.userName,
		phone: personal.phone,
		carne: personal.carne,
		status: personal.status,
	};
	return personalData;
}
