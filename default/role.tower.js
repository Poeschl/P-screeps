const WALL_MAX_HEALTH = 100000;

let roleTower = {

    /**
     * @param creeps
     * @param towers
     * @param structures
     * @param enemies
     */
    run: function (creeps, towers, structures, enemies) {
        towers.forEach((tower) => {
            if (enemies.length > 0) {
                console.log("Enemy Alert:", enemies[0].owner.username, "has sent his troops!")
                this.attackEnemy(tower, enemies[0])

            } else {
                let damagedCreeps = _.filter(creeps, (creep) => creep.hits < creep.hitsMax);
                damagedCreeps.forEach( (creep) => this.healCreep(tower, creep));

                if (tower.energy > 0.33 * tower.energyCapacity) {
                    let repairableStructures = _.filter(structures, (struct) => {
                        return struct.hits < struct.hitsMax
                            && ((struct.structureType === STRUCTURE_WALL && struct.hits <= WALL_MAX_HEALTH)
                                || struct.structureType === STRUCTURE_RAMPART
                                || struct.structureType === STRUCTURE_ROAD)
                    });
                    repairableStructures.forEach( (toRepair) => this.repair(tower, toRepair));
                }
            }
        });
    },

    attackEnemy: function (tower, enemy) {
        let attack = tower.attack(enemy);

        if (attack === ERR_NOT_ENOUGH_RESOURCES) {
            console.log("Not enough resources to attack", enemy.name);
        } else if (attack < 0) {
            console.log("Attack Error", attack);
        }
    },

    healCreep: function (tower, creep) {
        let healResult = tower.heal(creep);

        if (healResult === ERR_NOT_ENOUGH_RESOURCES) {
            console.log("Not enough resources to heal", creep.name);
        } else if (healResult < 0) {
            console.log("Heal Error", healResult);
        }
    },

    repair: function (tower, structure) {
        let repairResult = tower.repair(structure);

        if (repairResult === ERR_NOT_ENOUGH_RESOURCES) {
            console.log("Not enough resources to repair", structure.id, '(', structure.structureType, ')');
        } else if (repairResult < 0) {
            console.log("Repair Error", repairResult);
        }
    }
};

module.exports = roleTower;
