
import { db } from "./db";

export const targetTypeRepo = {
    create,
    update,
    getAll
};

const targetTypeDataToReturn = ['id', 'name', 'status'];

async function create() {
    const array = [
        'Industries',
        'AssistantProfile'
    ]

    array.map(async (element) => {
        const index = array.indexOf(element);
        const ruleId = index >= 0 ? index + 1 : null;
        let [created] = await db.TargetType.findOrCreate({
            where: { name: `${element}`, id: ruleId },
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
    return await db.TargetType.findAll({ attributes: targetTypeDataToReturn });
}

async function update(_id, params) {
    const targetType = await db.TargetType.findByPk(_id);
    if (!targetType) {
        throw 'TargetType not found';
    }

    if (!params.name || params.name.trim() === "" || params.name === undefined) {
        throw "name is required";
    }

    await targetType.update({
        name: params.name.trim(),
        status: null
    })

    return {
        name: targetType.name,
        status: null
    }
}