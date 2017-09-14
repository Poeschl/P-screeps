let actions = require('utils.actions')

const WALL_MAX_HEALTH = 100000;

let roleBuilder = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.building && creep.carry.energy === 0) {
            creep.memory.building = false;
        }
        if (!creep.memory.building && creep.carry.energy === creep.carryCapacity) {
            creep.memory.building = true;
        }

        if (creep.memory.building) {
            let constructions = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            if (constructions) {
                if (creep.build(constructions) === ERR_NOT_IN_RANGE) {
                    actions.moveTo(creep, constructions, '#ff1b34');
                }
            } else {
                let structureToRepair = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (struct) => {
                    return struct.hits < struct.hitsMax
                            && ((struct.structureType === STRUCTURE_WALL && struct.hits <= WALL_MAX_HEALTH)
                                || struct.structureType === STRUCTURE_RAMPART)
                }});
                actions.repair(creep, structureToRepair);
            }
        } else {
            actions.harvestEnergy(creep);
        }
    }
};

module.exports = roleBuilder;
