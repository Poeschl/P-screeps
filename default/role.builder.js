let harvesterRole = require('role.harvester')
let actions = require('utils.actions')

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
                if (creep)
                    harvesterRole.run(creep);
            }
        } else {
            actions.harvestEnergy(creep);
        }
    }
};

module.exports = roleBuilder;
