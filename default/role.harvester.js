let actions = require('utils.actions')

let roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.harvesting && creep.carry.energy === 0){
            creep.memory.harvesting = true;
        }
        if (!creep.memory.harvesting && creep.carry.energy === creep.carryCapacity) {
            creep.memory.harvesting = false;
        }

        if (creep.memory.harvesting) {
            actions.harvestEnergy(creep);
        } else {
            let target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_EXTENSION
                        || structure.structureType === STRUCTURE_SPAWN
                        || structure.structureType === STRUCTURE_TOWER
                        || structure.structureType === STRUCTURE_STORAGE)
                        && structure.energy < structure.energyCapacity;
                }
            });
            if (target.length > 0) {
                if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    actions.moveTo(creep, target, '#d6d6d6');
                }
            }
        }
    }
};

module.exports = roleHarvester;
