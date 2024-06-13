
import { db } from "./db";

export const rangoRepo = {
    create,
    update,
    getAll
};

const rangoDataToReturn = ['id', 'name', 'status'];

async function create() {
    const array = [
        'Clase',
        'Galonista',
        'Oficial',
        'Mayor'
    ]

    array.map(async (element) => {
        const index = array.indexOf(element);
        const rangoId = index >= 0 ? index + 1 : null;
        let [created] = await db.Rango.findOrCreate({
            where: { name: `${element}`, id: rangoId },
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
    return await db.Rango.findAll({ attributes: rangoDataToReturn });
}

async function update(_id, params) {
    const rango = await db.Rango.findByPk(_id);
    if (!rango) {
        throw 'Rango not found';
    }

    if (!params.name || params.name.trim() === "" || params.name === undefined) {
        throw "name is required";
    }

    await rango.update({
        name: params.name.trim(),
        status: null
    })

    return {
        name: rango.name,
        status: null
    }
}