
if ( typeof define !== 'function') {
    var define = require("amdefine")(module)
}
define(function (require, exports, module) {

    var transition = function(randomUniform){
        /* creates a function that takes probabilities and implements a
            step of Metropolis Hastings
        */

        var exports = function(){
            return
        }

        exports.simulation = function(startState, transition, updateState, observation,
            observationCounts, stateOdds, numSteps, cb){
            /* Runs MCMC algorithm using set exports.metropolis function. Observations are
               updated each round since transition cannot generate rejectable move. Observable
               returns both 1 and 0
            */
            var currentState = startState
            var observationCounts
            for (var step = 0; step < numSteps; step++){
                var possibleState = transition(currentState)
                var currentOdds = stateOdds(currentState, possibleState)
                var moveMade = exports.metropolis(1, currentOdds)
                if (moveMade){
                    var currentState = updateState(currentState, possibleState)
                }
                observationCounts = observation(currentState, observationCounts, {numSteps: numSteps, steps: step})
            }
            cb(observationCounts)
        }

        exports.metropolis = function(ProbabilityA, ProbabilityB){
            /* Metropolis step of moving from A to B
            */
            var output
            if (ProbabilityB > ProbabilityA){
                output = true
            } else {
                output = randomUniform() < Math.min(1, ProbabilityB/ProbabilityA)
            }
            return output
        }

        return exports
    }

    module.exports = transition;
});
