import { db } from "./db";
const { Op } = require("sequelize");

export const clientRepo = {
	create,
	getAll,
	getById,
	getByStatus,
	update,
	changeStatus,
};

const clientDataReturn = ["id", "name", "status", "logo"];

async function create(params) {
	if (params.name === null || params.name === "" || params.name === undefined) {
		throw " name is required";
	} else {
		let nameTrim = params.name.trim();

		if (await db.Client.findOne({ where: { name: nameTrim } })) {
			throw 'client "' + params.name + '"already exists"';
		}

		const client = new db.Client(params);
		let clientSaved = await client.save();

		let clientData = {
			id: clientSaved.id,
			name: clientSaved.name,
			status: clientSaved.status,
			logo: clientSaved.logo,
		};

		return clientData;
	}
}

async function getAll() {
	return await db.Client.findAll({ attributes: clientDataReturn });
}
async function getById(id) {
	return await db.Client.findOne({ where: { id: id } }, id, { attributes: clientDataReturn });
}

async function getByStatus({ status }) {
	console.log(status);
	let reports = await db.Client.findAll({
		where: { status: status },
		attributes: clientDataReturn,
		raw: true,
	});
	if (!reports || reports.length == 0) {
		return "client not found";
	}
	return reports;
}

async function update(_id, params) {
	const client = await db.Client.findByPk(_id);
	if (params.name === null || params.name === "" || params.name === undefined) {
		throw " name are required";
	} else {
		if (!client) {
			throw "client not found";
		}

		const nameTrim = params.name.trim();
		const nameExists = await db.Client.findOne({ where: { name: nameTrim, id: { [Op.not]: _id } } });

		if (nameExists) {
			throw `"Name '${params.name}' already exists"`;
		}

		// If no conflicts, update the client
		Object.assign(client, params);
		await client.save();

		let clientData = {
			id: client.id,
			name: client.name,
			status: client.status,
			logo: client.logo,
		};
		return clientData;
	}
}

async function changeStatus(id) {
	const client = await db.Client.findByPk(id);
	if (!client) throw "client not found";
	if (client.status == false) {
		Object.assign(client, { status: true });
	} else {
		Object.assign(client, { status: false });
	}
	await client.save();

	let clientData = {
		id: client.id,
		name: client.name,
		status: client.status,
		logo: client.logo,
	};
	return clientData;
}
