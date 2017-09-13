let constants = require('constants');

module.exports = {
    HOME_SPAWN: Game.spawns[constants.HOME_SPAWN_STRING],
    HOME_ROOM: Game.rooms[constants.HOME_ROOM_STRING],

    PAUSE_FLAG: Game.flags[constants.FLAG_PAUSE_STRING]
};
