(function(){

    define(function (require, exports, module) {

        var transition = function(randomUniform){
            /* creates a function that takes probabilities and implements a
                step of Metropolis Hastings
            */

            var exports = function(){
                return
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
})()
