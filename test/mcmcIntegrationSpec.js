if (typeof define !== 'function') {
    var define = require("amdefine")(module)
}
define(function (require, exports, module) {

    var _ = require("underscore")

    describe("Seasons Module", function(){

        var instance, mockSeason, mcmc
        beforeEach(function(){
            instance = require('src/seasons')(_)
            mcmc = require('src/transition')(Math.random)

            mockSeason = {
                table: [
                    {name: 'liverbird', wins:5, losses:5, draws: 5},
                    {name: 'soccerpidgeons', wins:5, losses:5, draws: 5}
                ],
                games: [
                    {home:'liverbird', away:'soccerpidgeons', 'outcome': "W"},
                    {home:'liverbird', away:'soccerpidgeons', 'outcome': "W"},
                    {home:'liverbird', away:'soccerpidgeons', 'outcome': "W"},
                    {home:'liverbird', away:'soccerpidgeons', 'outcome': "W"},
                    {away:'liverbird', home:'soccerpidgeons', 'outcome': "W"},
                    {away:'liverbird', home:'soccerpidgeons', 'outcome': "W"},
                    {away:'liverbird', home:'soccerpidgeons', 'outcome': "W"}
                ]
            }
        })
        describe("test run", function(){

            var observable, observationCounts
            beforeEach(function(){
                observable = function(season, observationCounts, params){

                    instance.computePointsSoccer(season)
                    var sortedTable = season.table.sort(function(a, b){
                        if (a.points > b.points){
                            return -1
                        }
                        return 1
                    })

                    var liverbirdWins = sortedTable[0].name == 'liverbird'

                    if (liverbirdWins){
                        observationCounts.probability += 1 / params.numSteps
                        observationCounts.totals += 1
                    }
                    return observationCounts
                }

                observationCounts = {
                    'probability': 0,
                    'totals': 0
                }

            })
            it("should place the team winning nearly 50% of the time", function(done){

                var cb = function(data){
                    var difference = data.probability - .5
                    expect(Math.abs(difference) < .01).toBeTruthy()
                    done()
                }
                instance.defaultSimulation(mockSeason, 100000, observable, observationCounts, mcmc.simulation, cb)

            })

        })
    })
})
