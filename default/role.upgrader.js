let actions = require('utils.actions')

let roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy === 0) {
            creep.memory.upgrading = false;
	    }
	    if(!creep.memory.upgrading && creep.carry.energy === creep.carryCapacity) {
	        creep.memory.upgrading = true;
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                actions.moveTo(creep, creep.room.controller, '#ffffff');
            }
        }
        else {
            actions.harvestEnergy(creep);
        }
	}
};

module.exports = roleUpgrader;
