let locations = require('utils.locations')

let roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.carry.energy < creep.carryCapacity) {
            let nearSource = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
            if(creep.harvest(nearSource) === ERR_NOT_IN_RANGE) {
                creep.moveTo(nearSource);
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_EXTENSION
                            || structure.structureType === STRUCTURE_SPAWN
                            || structure.structureType === STRUCTURE_TOWER
                            || structure.structureType === STRUCTURE_STORAGE)
                            && structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#d6d6d6'}});
                }
            } else {
                creep.moveTo(locations.PAUSE_FLAG, {visualizePathStyle: {stroke: '#2b2b2b'}});
            }
        }
	}
};

module.exports = roleHarvester;
