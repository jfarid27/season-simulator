if ( typeof define !== 'function') {
    var define = require("amdefine")(module)
}
define(function (require, exports, module) {

    var seasons = function(_, MCMC){

        var exports = function(){
            return
        }

        exports.simulation = function(season, steps, observable){

        }

        exports.generateFinalGamesList = function(games){
            /* Function to add winning outcomes to each game in specified games
            */
            return games.map(function(oldGame){
                var game = _.extend({}, oldGame)
                game.outcome = "W"
                return game
            })
        }


        exports.transitionRandomGame = function(games, transition){

            var selected = _.random(games.length-1)

            return games.map(function(game, index){

                var output = game
                if (index == selected){
                    output = transition(game)
                }
                return output
            })
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

        return exports
    }

    module.exports = seasons;
});
