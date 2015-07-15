if (typeof define !== 'function') {
    var define = require("amdefine")(module)
}
define(function (require, exports, module) {

    var _ = require("underscore")

    describe("Seasons Module", function(){

        var instance
        beforeEach(function(){
            instance = require('src/seasons')(_)
        })
        describe("generateFinalTable", function(){
            describe("scenario test", function(){
                describe("when given a table and games list", function(){

                    var results, resultsTable, gamesList
                    beforeEach(function(){

                        resultsTable = [
                            {name: 'liverbird', wins:0, losses:0, draws: 0},
                            {name: 'soccerpidgeons', wins:0, losses:0, draws: 0}
                        ]
                        
                        gamesList = [
                            {home:'liverbird', away:'soccerpidgeons'},
                            {home:'liverbird', away:'soccerpidgeons'},
                            {home:'liverbird', away:'soccerpidgeons'},
                            {home:'liverbird', away:'soccerpidgeons'},
                            {away:'liverbird', home:'soccerpidgeons'},
                            {away:'liverbird', home:'soccerpidgeons'},
                            {away:'liverbird', home:'soccerpidgeons'},
                        ]

                        results = instance.generateFinalTable(resultsTable, gamesList)

                        resultsTable = _.object(results.map(function(teamSummary){
                            return [teamSummary.name, teamSummary]
                        }))
                    })
                    it("should generate a table where all the wins were distributed to the home team", function(){

                        expect(resultsTable['liverbird'].wins).toBe(4)
                        expect(resultsTable['soccerpidgeons'].wins).toBe(3)
                        expect(resultsTable['liverbird'].losses).toBe(3)
                        expect(resultsTable['soccerpidgeons'].losses).toBe(4)
                    })
                })
            })

        })
    })

});
