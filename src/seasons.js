if ( typeof define !== 'function') {
    var define = require("amdefine")(module)
}
define(function (require, exports, module) {

    var seasons = function(_){

        var table, gamesLeft

        var exports = function(){
            return
        }

        exports.generateFinalTable = function(seasonTable, games){
            /* Function to generate a final table given a season table and a list of games.
               Generates final table by distributing wins to every home team.
            */
            return games.reduce(function(seasonTable, game){
                var seasonTableByTeam = _.object(seasonTable.map(function(summary){
                    return [summary.name, summary]
                }))

                seasonTableByTeam[game.home].wins++
                seasonTableByTeam[game.away].losses++

                return _.pairs(seasonTableByTeam).map(function(pair){ return pair[1]})

            }, seasonTable)
        }

        exports.season = function(){
            if (arguments){
                initialTable = arguments[0].table
                gamesLeft = arguments[0].gamesLeft
                return exports
            }
            return {
                table: initialTable,
                gamesLeft: gamesLeft
            }
        }

        return exports
    }

    module.exports = seasons;
});
