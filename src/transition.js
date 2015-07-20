
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

        exports.simulation = function(startState, transition, observation, probabilityOfMove, numSteps){
            /* Runs MCMC algorithm using set exports.metropolis function
            */
            var currentState = startState
            for (var step = 0; step < numSteps; step++){
                var possibleState = transition(state)
                var moveProbability = probabilityOfMove(currentState, possibleState)
                var observationCount = 0
                if (exports.metropolis(1, moveProbability)){
                    var currentState = updateState(currentState, possibleState)
                    observationCount += observation(currentState)
                }
            }
            return observationCount / numSteps
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
