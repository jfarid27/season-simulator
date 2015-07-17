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

        describe("applyGamesToTableSoccer", function(){

            describe("scenario test", function(){

                describe("when given a table and games list", function(){
                    it("should distribute points to each team in the table based on game outcomes")
                })

            })

        })

        describe("randomGameOutcomeSoccer", function(){
            describe("when called", function(){

                var mockUnderscore, instance, _
                beforeEach(function(){
                    mockUnderscore = function(){
                        var setOutput = 0
                        var exports = function(){
                            return
                        }
                        exports.random = function(){
                            return setOutput
                        }
                        exports.setOutput = function(setting){
                            setOutput = setting
                        }
                        return exports
                    }

                    _ = mockUnderscore()
                    
                    instance = require('src/seasons')(_)
                })
                describe("when _.random() returns 0", function(){
                    var result
                    beforeEach(function(){
                        _.setOutput(0)
                        result = instance.randomGameOutcomeSoccer()
                    }) 
                    it("should return 'W'", function(){
                        expect(result).toBe("W")
                    })
                })
                describe("when _.random() returns 1", function(){
                    var result
                    beforeEach(function(){
                        _.setOutput(1)
                        result = instance.randomGameOutcomeSoccer()
                    }) 
                    it("should return 'L'", function(){
                        expect(result).toBe("L")
                    })
                })
                describe("when _.random() returns 2", function(){
                    var result
                    beforeEach(function(){
                        _.setOutput(2)
                        result = instance.randomGameOutcomeSoccer()
                    }) 
                    it("should return 'T'", function(){
                        expect(result).toBe("T")
                    })
                })
            })

        })

        describe("generateFinalGamesList", function(){
            describe("scenario test", function(){

                describe("when given a list of games", function(){
                    var gamesList, results
                    beforeEach(function(){
                        gamesList = [
                            {home:'liverbird', away:'soccerpidgeons'},
                            {home:'liverbird', away:'soccerpidgeons'},
                            {home:'liverbird', away:'soccerpidgeons'},
                            {home:'liverbird', away:'soccerpidgeons'},
                            {away:'liverbird', home:'soccerpidgeons'},
                            {away:'liverbird', home:'soccerpidgeons'},
                            {away:'liverbird', home:'soccerpidgeons'},
                        ]

                        results = instance.generateFinalGamesList(gamesList)
                    })
                    
                    it("should change all the outcomes in games list to reflect home wins", function(){

                        var expected = results.reduce(function(agg, game){

                            return agg && (game.outcome === "W")

                        }, true)

                        expect(expected).toBeTruthy()

                    })
                })

            })
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
