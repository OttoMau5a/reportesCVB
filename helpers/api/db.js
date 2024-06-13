import getConfig from "next/config";
import mysql from "mysql2/promise";
import { Sequelize, DataTypes } from "sequelize";

const { serverRuntimeConfig } = getConfig();

export const db = {
	initialized: false,
	initialize,
};

// initialize db and models, called on first api request from /helpers/api/api-handler.js
async function initialize() {
	// create db if it doesn't already exist & all this data is coming from next.config.js
	const { host, port, user, password, database } = serverRuntimeConfig.dbConfig;
	console.log(port);
	const connection = await mysql.createConnection({ host, port, user, password });
	await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

	// connect to db
	const sequelize = new Sequelize(database, user, password, { host, dialect: "mysql" });

	// init models and add them to the exported db object
	db.User = userModel(sequelize);
	db.Personal = personal(sequelize);
	db.Rango = rango(sequelize);
	db.TypeService = typeService(sequelize);
	db.TypeUnidad = typeUnidad(sequelize);
	db.Unidad = unidad(sequelize);
	db.Hospital = hospital(sequelize);
	db.Boleta = boleta(sequelize);
	db.Reporte = reporte(sequelize);

	// create associations
	db.Personal.belongsTo(db.Rango);
	db.Rango.hasMany(db.Personal);

	db.Unidad.belongsTo(db.TypeUnidad);
	db.TypeUnidad.hasMany(db.Unidad);

	db.Boleta.belongsTo(db.Unidad);
	db.Unidad.hasMany(db.Boleta);

	db.Boleta.belongsTo(db.Personal);
	db.Personal.hasMany(db.Boleta);

	db.Boleta.belongsTo(db.TypeService);
	db.TypeService.hasOne(db.Boleta);

	db.Reporte.belongsTo(db.Boleta);
	db.Boleta.hasOne(db.Reporte);

	db.Reporte.belongsTo(db.Hospital);
	db.Hospital.hasOne(db.Reporte);

	db.Reporte.belongsTo(db.Personal);
	db.Personal.hasMany(db.Reporte);

	db.Reporte.belongsTo(db.Unidad);
	db.Unidad.hasMany(db.Reporte);

	db.Reporte.belongsTo(db.TypeService);
	db.TypeService.hasOne(db.Reporte);

	// sync all models with database
	await sequelize.sync({ force: true });
	//await sequelize.sync();

	db.initialized = true;
}

// sequelize models with schema definitions

function userModel(sequelize) {
	const attributes = {
		username: { type: DataTypes.STRING, allowNull: false },
		hash: { type: DataTypes.STRING, allowNull: false },
		firstName: { type: DataTypes.STRING, allowNull: false },
		lastName: { type: DataTypes.STRING, allowNull: false },
		status: { type: DataTypes.BOOLEAN, allowNull: true },
	};

	const options = {
		defaultScope: {
			// exclude password hash by default
			attributes: { exclude: ["hash"] },
		},
		scopes: {
			// include hash with this scope
			withHash: { attributes: {} },
		},
	};

	return sequelize.define("User", attributes, options);
}

function personal(sequelize) { //
	const attributes = {
		name: { type: DataTypes.STRING, allowNull: false },
		lastName: { type: DataTypes.STRING, allowNull: false },
		userName: { type: DataTypes.STRING, allowNull: false },
		phone: { type: DataTypes.STRING, allowNull: true },
		carne: { type: DataTypes.STRING, allowNull: true },
		status: { type: DataTypes.BOOLEAN, allowNull: true },
	};

	return sequelize.define("Personal", attributes);
}

function rango(sequelize) { //
	const attributes = {
		name: { type: DataTypes.STRING, allowNull: false },
		status: { type: DataTypes.BOOLEAN, allowNull: true },
	};

	return sequelize.define("Rango", attributes);
}

function typeService(sequelize) { //
	const attributes = {
		name: { type: DataTypes.STRING, allowNull: false },
		status: { type: DataTypes.BOOLEAN, allowNull: true },
	};

	return sequelize.define("TypeService", attributes);
}
function typeUnidad(sequelize) { //
	const attributes = {
		name: { type: DataTypes.STRING, allowNull: false },
		status: { type: DataTypes.BOOLEAN, allowNull: true },
	};

	return sequelize.define("TypeUnidad", attributes);
}
function unidad(sequelize) { //
	const attributes = {
		placa: { type: DataTypes.STRING, allowNull: false },
		status: { type: DataTypes.BOOLEAN, allowNull: true },
	};

	return sequelize.define("Unidad", attributes);
}
function hospital(sequelize) { //
	const attributes = {
		name: { type: DataTypes.STRING, allowNull: false },
		status: { type: DataTypes.BOOLEAN, allowNull: true },
	};

	return sequelize.define("Hospital", attributes);
}
function boleta(sequelize) {
	const attributes = {
		fecha: { type: DataTypes.STRING, allowNull: false },
		direccion: { type: DataTypes.STRING, allowNull: false },
		solicitante: { type: DataTypes.STRING, allowNull: false },
		numeroSolicitante: { type: DataTypes.STRING, allowNull: true },
		horaSalida: { type: DataTypes.STRING, allowNull: false },
		horaEntrada: { type: DataTypes.STRING, allowNull: false },
		unidad: { type: DataTypes.STRING, allowNull: false },
		piloto: { type: DataTypes.STRING, allowNull: false },
		responsable: { type: DataTypes.STRING, allowNull: false },
		servicio: { type: DataTypes.STRING, allowNull: false },
		status: { type: DataTypes.BOOLEAN, allowNull: true },
	};

	return sequelize.define("Boleta", attributes);
}
function reporte(sequelize) {
	const attributes = {
		minutosTrabajados: { type: DataTypes.STRING, allowNull: false },
		solicitud: { type: DataTypes.STRING, allowNull: false },
		fecha: { type: DataTypes.STRING, allowNull: false },
		salida: { type: DataTypes.STRING, allowNull: false },
		horaSalida: { type: DataTypes.STRING, allowNull: false },
		entrada: { type: DataTypes.STRING, allowNull: false },
		horaEntrada: { type: DataTypes.STRING, allowNull: false },
		direccion: { type: DataTypes.STRING, allowNull: false },
		solicitante: { type: DataTypes.STRING, allowNull: false },
		pacientes: { type: DataTypes.STRING, allowNull: true },
		fallecidos: { type: DataTypes.STRING, allowNull: true },
		opcionFallecidos: { type: DataTypes.STRING, allowNull: false },
		edades: { type: DataTypes.STRING, allowNull: true },
		domicilio: { type: DataTypes.STRING, allowNull: false },
		acompanantes: { type: DataTypes.STRING, allowNull: false },
		radiotelefonista: { type: DataTypes.STRING, allowNull: false },
		tipoServicio: { type: DataTypes.STRING, allowNull: false },
		hospital: { type: DataTypes.STRING, allowNull: true },
		piloto: { type: DataTypes.STRING, allowNull: false },
		unidad: { type: DataTypes.STRING, allowNull: false },
		encargado: { type: DataTypes.STRING, allowNull: false },
		jefeDeServicio: { type: DataTypes.STRING, allowNull: false },
		personalDestacado: { type: DataTypes.STRING, allowNull: false },
		observaciones: { type: DataTypes.text, allowNull: false },
		status: { type: DataTypes.BOOLEAN, allowNull: true },
	};

	return sequelize.define("Reporte", attributes);
}
