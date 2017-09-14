let constants = require('constants')
let locations = require('utils.locations')

const minHarvester = 5;
const minUpgrader = 4;
const minBuilder = 4;

let spawnutil = {

    spawnCreep: function () {

        if (minHarvester > this.getCountOf(constants.GROUP_HARVESTER)) {
            this.spawnHarvester()

        } else if (minUpgrader > this.getCountOf(constants.GROUP_UPGRADER)) {
            this.spawnUpgrader()

        } else if (minBuilder > this.getCountOf(constants.GROUP_BUILDER)) {
            this.spawnBuilder()
        }

        // console.log('harvester:', this.getCountOf(constants.GROUP_HARVESTER), '(', minHarvester, ')');
        // console.log('upgrader:', this.getCountOf(constants.GROUP_UPGRADER), '(', minUpgrader, ')');
        // console.log('builder:', this.getCountOf(constants.GROUP_BUILDER), '(', minBuilder, ')');
    },

    getCountOf: function (groupName) {
        return _.sum(Game.creeps, (c) => c.memory.role === groupName);
    },

    spawnHarvester: function () {
        this.spawnCreepOfGroup([WORK, WORK, CARRY, CARRY, MOVE, MOVE], constants.GROUP_HARVESTER)
    },

    spawnUpgrader: function () {
        this.spawnCreepOfGroup([WORK, WORK, CARRY, CARRY, MOVE, MOVE], constants.GROUP_UPGRADER)
    },

    spawnBuilder: function () {
        this.spawnCreepOfGroup([WORK, WORK, CARRY, CARRY, MOVE, MOVE], constants.GROUP_BUILDER)
    },

    spawnCreepOfGroup: function (modules, group) {
        let spawn = locations.HOME_SPAWN;
        if (spawn !== null) {
            let result = locations.HOME_SPAWN.createCreep(modules, undefined, {role: group});
            if (result === ERR_BUSY) {
                console.log('Couldn\'t create creep of group', group, '. Spawn is busy!')
            } else if (result === ERR_NOT_ENOUGH_ENERGY) {
                console.log('Couldn\'t create creep of group', group, '. Low energy!')
            } else {
                console.log('Created new creep: ', result, '(', group, ')')
            }
        }
    }
};

module.exports = spawnutil;
