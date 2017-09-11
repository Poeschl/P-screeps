let upgradeRole = require('role.upgrader')

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
                    creep.moveTo(constructions, {visualizePathStyle: {stroke: '#ff1b34'}});
                }
            } else {
                let decayingBuilding = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType === STRUCTURE_ROAD
                            && structure.ticksToDecay < 500;
                    }
                });
                upgradeRole.run(creep);
            }
        } else {
            let sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
    }
};

module.exports = roleBuilder;
