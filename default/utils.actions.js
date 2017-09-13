const MAX_CREEPS_AROUND_ENERGY_SOURCE = 4;
const MAX_CREEPS_STANDING_TICKS = 5;

let actions = {

    harvestEnergy(creep) {
        let targetSource = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);

        let creepsAround = targetSource.pos.findInRange(FIND_CREEPS, 2);
        if (creepsAround.length >= MAX_CREEPS_AROUND_ENERGY_SOURCE && creepsAround.indexOf(creep) < 0) {
            targetSource = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE, {
                filter: (source) => source.id !== targetSource.id
            });
        }

        if (creep.harvest(targetSource) === ERR_NOT_IN_RANGE) {
            this.moveTo(creep, targetSource, '#ffda86');
        }
    },

    moveTo: function (creep, target, strokeColor = undefined) {
        if (creep.memory.standingTime === undefined) {
            creep.memory.standingTime = 0;
        }

        let lastPos = creep.pos;
        creep.moveTo(target, {visualizePathStyle: {stroke: strokeColor}, reusePath: true});

        if (creep.pos === lastPos) {
            creep.memory.standingTime = creep.memory.standingTime + 1;
        }

        if (creep.memory.standingTime > MAX_CREEPS_STANDING_TICKS) {
            //TODO: better path calculation
            creep.moveTo(target, {visualizePathStyle: {stroke: strokeColor}, reusePath: false});
            creep.memory.standingTime = 0;
        }
    }
};

module.exports = actions;
