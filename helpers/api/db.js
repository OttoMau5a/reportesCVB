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
	db.Client = client(sequelize);
	db.Event = event(sequelize);
	db.Context = context(sequelize);
	db.Target = target(sequelize);
	db.TargetType = targetType(sequelize);
	db.Keypoints = keypoints(sequelize);
	db.Anexos = anexos(sequelize);
	db.DataBase = dataBase(sequelize);

	// define model associations
	db.Event.belongsTo(db.Client);
	db.Client.hasMany(db.Event);

	db.Event.hasMany(db.Context);
	db.Context.belongsTo(db.Event);

	db.Event.hasMany(db.Target);
	db.Target.belongsTo(db.Event);

	db.Target.belongsTo(db.TargetType);
	db.TargetType.hasMany(db.Target);

	db.Event.hasMany(db.Keypoints);
	db.Keypoints.belongsTo(db.Event);

	db.Event.hasMany(db.Anexos);
	db.Anexos.belongsTo(db.Event);

	db.Event.hasMany(db.DataBase);
	db.DataBase.belongsTo(db.Event);

	// sync all models with database
	// await sequelize.sync({ alter: true });
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

function client(sequelize) {
	const attributes = {
		name: { type: DataTypes.STRING, allowNull: false },
		logo: { type: DataTypes.STRING, allowNull: true },
		status: { type: DataTypes.BOOLEAN, allowNull: true },
	};

	return sequelize.define("Client", attributes);
}

function event(sequelize) {
	const attributes = {
		name: { type: DataTypes.STRING, allowNull: false },
		status: { type: DataTypes.BOOLEAN, allowNull: true },
	};

	return sequelize.define("Event", attributes);
}

function context(sequelize) {
	const attributes = {
		imageURL: { type: DataTypes.STRING, allowNull: true },
		introduction: { type: DataTypes.TEXT, allowNull: true },
		eventFormat: { type: DataTypes.TEXT, allowNull: true },
		fecha: { type: DataTypes.STRING, allowNull: true },
		lugar: { type: DataTypes.STRING, allowNull: true },
		hora: { type: DataTypes.STRING, allowNull: true },
		status: { type: DataTypes.BOOLEAN, allowNull: true },
	};

	return sequelize.define("Context", attributes);
}

function target(sequelize) {
	const attributes = {
		name: { type: DataTypes.STRING, allowNull: true },
		count: { type: DataTypes.STRING, allowNull: true },
		status: { type: DataTypes.BOOLEAN, allowNull: true },
	};

	return sequelize.define("Target", attributes);
}

function targetType(sequelize) {
	const attributes = {
		name: { type: DataTypes.STRING, allowNull: true },
		status: { type: DataTypes.BOOLEAN, allowNull: true },
	};

	return sequelize.define("TargetType", attributes);
}

function keypoints(sequelize) {
	const attributes = {
		imageURL: { type: DataTypes.STRING, allowNull: true },
		countInvitados: { type: DataTypes.INTEGER, allowNull: true },
		countAsistentesReales: { type: DataTypes.INTEGER, allowNull: true },
		countIndustrias: { type: DataTypes.INTEGER, allowNull: true },
		countSatisfaccion: { type: DataTypes.INTEGER, allowNull: true },
		countPromotor: { type: DataTypes.INTEGER, allowNull: true },
		countPasivo: { type: DataTypes.INTEGER, allowNull: true },
		countDetractor: { type: DataTypes.INTEGER, allowNull: true },
		countNPS: { type: DataTypes.INTEGER, allowNull: true },
		status: { type: DataTypes.BOOLEAN, allowNull: true },
	};
	return sequelize.define("Keypoints", attributes);
}

function anexos(sequelize) {
	const attributes = {
		imageURLSaveTheDate: { type: DataTypes.STRING, allowNull: true },
		imageURLInvitacionOficial: { type: DataTypes.STRING, allowNull: true },
		imageURLFotoEvento1: { type: DataTypes.STRING, allowNull: true },
		imageURLFotoEvento2: { type: DataTypes.STRING, allowNull: true },
		imageURLFotoEvento3: { type: DataTypes.STRING, allowNull: true },
		imageURLFotoEvento4: { type: DataTypes.STRING, allowNull: true },
		imageURLFotoEvento5: { type: DataTypes.STRING, allowNull: true },
		imageURLFotoEvento6: { type: DataTypes.STRING, allowNull: true },
		imageURLFotoEvento7: { type: DataTypes.STRING, allowNull: true },
		imageURLFotoEvento8: { type: DataTypes.STRING, allowNull: true },
		imageURLPromocionales: { type: DataTypes.STRING, allowNull: true },
		imageURLMaterialImpreso: { type: DataTypes.STRING, allowNull: true },
		status: { type: DataTypes.BOOLEAN, allowNull: true },
	};

	return sequelize.define("Anexos", attributes);
}

function dataBase(sequelize) {
	const attributes = {
		imageURLPreview: { type: DataTypes.STRING, allowNull: true },
		imageURLQR: { type: DataTypes.STRING, allowNull: true },
		status: { type: DataTypes.BOOLEAN, allowNull: true },
	};

	return sequelize.define("DataBase", attributes);
}
