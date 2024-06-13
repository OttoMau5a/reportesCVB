import { db } from "./db";

export const typeUnidadRepo = {
    create,
    update,
    getAll
};

const typeUnidadDataToReturn = ['id', 'name', 'status'];

async function create() {
    const array = [
        'Ambulancia',
        'Motobomba',
        'Rescate',
        'Abastecimiento',
        'Otro'
    ]

    array.map(async (element) => {
        const index = array.indexOf(element);
        const typeUnidadId = index >= 0 ? index + 1 : null;
        let [created] = await db.TypeUnidad.findOrCreate({
            where: { name: `${element}`, id: typeUnidadId },
            defaults: {
                name: `${element}`, attributes: ['name', 'id']

            }
        });
        if (created) {
            console.log("created")
        } else {
            console.log("find")
        }
    })
}

async function getAll() {
    return await db.TypeUnidad.findAll({ attributes: typeUnidadDataToReturn });
}

async function update(_id, params) {
    const typeUnidad = await db.TypeUnidad.findByPk(_id);
    if (!typeUnidad) {
        throw 'typeUnidad not found';
    }

    if (!params.name || params.name.trim() === "" || params.name === undefined) {
        throw "name is required";
    }

    await typeUnidad.update({
        name: params.name.trim(),
        status: null
    })

    return {
        name: typeUnidad.name,
        status: null
    }
}