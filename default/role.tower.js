const WALL_MAX_HEALTH = 50000;
const RAMPART_MAX_HEALTH = 50000;

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
                damagedCreeps.forEach((creep) => this.healCreep(tower, creep));

                let repairableStructures = [];
                if (tower.energy > 0.33 * tower.energyCapacity) {
                    repairableStructures = repairableStructures.concat(_.filter(structures, (struct) => {
                        return struct.hits < struct.hitsMax &&
                            ((struct.structureType === STRUCTURE_RAMPART && struct.hits <= RAMPART_MAX_HEALTH)
                                || struct.structureType === STRUCTURE_ROAD)
                    }));

                }
                if (tower.energy > 0.66 * tower.energyCapacity) {
                    repairableStructures = repairableStructures.concat(_.filter(structures, (struct) => {
                        return struct.structureType === STRUCTURE_WALL && struct.hits <= WALL_MAX_HEALTH
                    }));
                }

                if (repairableStructures.length > 0) {
                    let sorted = repairableStructures.sort((o1, o2) => (o1.hits / o1.hitsMax) < (o2.hits / o2.hitsMax));
                    this.repair(tower, sorted[0]);
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
            console.log("Not enough resources to repair", structure, '(', structure.structureType, ')');
        } else if (repairResult === ERR_INVALID_TARGET) {
            console.log("Invalid target to repair", structure);
        } else if (repairResult < 0) {
            console.log("Repair Error", repairResult, '(', tower, ')');
        }
    }
};

module.exports = roleTower;
