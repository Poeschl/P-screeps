let roleHarvester = require("role.harvester");
let roleUpgrader = require('role.upgrader');
let roleBuiler = require('role.builder');
let roleTower = require('role.tower');
let spawnUtils = require('utils.spawnutil');
let constants = require('constants');
let locations = require('utils.locations');

module.exports.loop = function () {

    //Memory cleanup
    for (let name in Memory.creeps) {
        if (!Game.creeps[name]) {
            let gotDeleted = delete Memory.creeps[name];
            if (gotDeleted) {
                console.log('Deleting memory of: ', name);
            }
        }
    }

    let allOwnCreeps = Game.creeps;
    var allStructuresInHome = locations.HOME_ROOM.find(FIND_MY_STRUCTURES);
    allStructuresInHome = allStructuresInHome.concat(locations.HOME_ROOM.find(FIND_STRUCTURES,
        (struct) => struct.structureType === STRUCTURE_ROAD) || struct.structureType === STRUCTURE_WALL || struct.structureType === STRUCTURE_WALL);
    let allTowersInHome = locations.HOME_ROOM.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
    let allEnemiesInHome = locations.HOME_ROOM.find(FIND_HOSTILE_CREEPS);

    //Auto-Spawn
    spawnUtils.spawnCreep();

    //tower actions
    roleTower.run(allOwnCreeps, allTowersInHome, allStructuresInHome, allEnemiesInHome);

    //Creep action
    for (let name in allOwnCreeps) {
        let creep = Game.creeps[name];
        if (creep.memory.role === constants.GROUP_HARVESTER) {
            roleHarvester.run(creep);
        } else if (creep.memory.role === constants.GROUP_UPGRADER) {
            roleUpgrader.run(creep);
        } else if (creep.memory.role === constants.GROUP_BUILDER) {
            roleBuiler.run(creep);
        }
    }
}
