if ( typeof define !== 'function') {
    var define = require("amdefine")(module)
}
define(function (require, exports, module) {

    var seasons = function(_, MCMC){

        var exports = function(){
            return
        }

        exports.simulation = function(season, steps, observable){

            var endOfSeasonState = {
                table: generateFinalTable(season.table),
                games: generateFinalGamesList(season.games)
            }

        }

        exports.selectRandomGame = function(games, randomGameOutcome){
        /* Returns index of a random game in games list
        */
            return _.random(games.length-1)
        }

        exports.generatePossibleTransition = function(season, selectRandomGame, 
            randomGameOutcome, probability){
        /* Returns new transition object from specified season object
        */
            return {
                gameIndex: selectRandomGame(season.games),
                outcome: randomGameOutcome(),
                probability: probability() 
            }

        }
        exports.addGameToTable = function(table, game){
            /* Updates points to reflect addition of a game outcome to table
            */
            var keyVals = table.map(function(j){ return [j.name, j]})
            var keyTable = _.object(keyVals)
            if (game.outcome == "W"){
                keyTable[game.home].wins++
                keyTable[game.away].losses++
            }
            if (game.outcome == "L"){
                keyTable[game.home].losses++
                keyTable[game.away].wins++
            }
            if (game.outcome == "T"){
                keyTable[game.home].draws++
                keyTable[game.away].draws++
            }
            return _.pairs(keyTable).map(function(p){ return p[1] }) 
        }

        exports.removeGameFromTable = function(table, game){
            /* Updates points to reflect removal of a game outcome from table
            */
            var keyVals = table.map(function(j){ return [j.name, j]})
            var keyTable = _.object(keyVals)
            if (game.outcome == "W"){
                keyTable[game.home].wins--
                keyTable[game.away].losses--
            }
            if (game.outcome == "L"){
                keyTable[game.home].losses--
                keyTable[game.away].wins--
            }
            if (game.outcome == "T"){
                keyTable[game.home].draws--
                keyTable[game.away].draws--
            }
            return _.pairs(keyTable).map(function(p){ return p[1] }) 
        }

        exports.updateSeasonWithGame = function(season, transitionState, add, remove){
            /* Returns season with updated game using transitionState
            */
            var prev = season.games[transitionState.gameIndex]

            season.table = remove(season.table, {home: prev.home, away: prev.away,
                outcome: prev.outcome
            })
            season.table = add(season.table, {home: prev.home, away: prev.away,
                outcome: transitionState.outcome
            })
            
            season.games[transitionState.gameIndex].outcome = transitionState.outcome
            
            return season

        }

        exports.randomGameOutcomeSoccerOdds = function(){
            /* Returns random game outcome using W/L
            */
            var possibilities = ["W", "L"]
            return possibilities[_.random(2)]

        }

        exports.tableTransitionProbabilityOdds = function(current, transitionState){
            /* Returns equiprobable transition probability for W/L given 
               current and new states
            */
            return transitionState.probability 
        }

        exports.tableTransitionProbabilityEqual = function(current, next){
            /* Returns equiprobable transition probability for W/L/T given 
               current and new states
            */
            return 1/3
        }

        exports.randomGameOutcomeSoccer = function(){
            /* Returns random game outcome using W/L/T
            */
            var possibilities = ["W", "L", "T"]
            return possibilities[_.random(3)]
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
