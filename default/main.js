let roleHarvester = require('role.harvester');
let roleUpgrader = require('role.upgrader');
let roleBuiler = require('role.builder');
let spawnUtils = require('spawnutil');
let constants = require('constants')

module.exports.loop = function () {

    //Memory cleanup
    for(let name in Memory.creeps) {
        if(!Game.creeps[name]) {
            let gotDeleted = delete Memory.creeps[name];
            if (gotDeleted) {
                console.log('Deleting memory of: ', name);
            }
        }
    }

    //Auto-Spawn
    spawnUtils.spawnCreep();

    for(let name in Game.creeps) {
        let creep = Game.creeps[name];
        if(creep.memory.role === constants.GROUP_HARVESTER) {
            roleHarvester.run(creep);
        } else if(creep.memory.role === constants.GROUP_UPGRADER) {
            roleUpgrader.run(creep);
        } else if(creep.memory.role === constants.GROUP_BUILDER) {
            roleBuiler.run(creep);
        }
    }
}
