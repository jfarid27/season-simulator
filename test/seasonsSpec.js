if (typeof define !== 'function') {
    var define = require("amdefine")(module)
}
define(function (require, exports, module) {

    var _ = require("underscore")

    describe("Seasons Module", function(){

        var instance, mockSeason
        beforeEach(function(){
            instance = require('src/seasons')(_)
            mockSeason = {
                table: [
                    {name: 'liverbird', wins:0, losses:0, draws: 0},
                    {name: 'soccerpidgeons', wins:0, losses:0, draws: 0}
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
        describe("updateSeasonWithGame", function(){
            describe("scenario test", function(){
                describe("when given a mock transition state with correct updaters", function(){

                    var season, transition, add, remove, result
                    beforeEach(function(){

                        season = mockSeason
                        transition = {
                            "outcome": "T",
                            "gameIndex": 3,
                        }
                        add = instance.addGameToTable
                        remove = instance.removeGameFromTable
                        result = instance.updateSeasonWithGame(mockSeason, transition, add, remove)
                    })

                    it("should correctly update table", function(){
                        keyVals = result.table.map(function(j){
                            return [j.name, j]
                        })
                        keyTable = _.object(keyVals)
                        expect(keyTable["liverbird"].wins).toBe(-1)
                        expect(keyTable["liverbird"].losses).toBe(0)
                        expect(keyTable["soccerpidgeons"].wins).toBe(0)
                        expect(keyTable["soccerpidgeons"].losses).toBe(-1)
                        expect(keyTable["soccerpidgeons"].draws).toBe(1)
                        expect(keyTable["liverbird"].draws).toBe(1)

                    })
                    it("should correctly update game", function(){
                        expect(result.games[3].outcome).toBe("T")
                    })
                })
            })
        })
        describe("addGameToTable", function(){
            describe("scenario test", function(){

                describe("when given a table", function(){

                    var mockTable
                    beforeEach(function(){
                        mockTable = [
                            {name: 'liverbird', wins:4, losses:5, draws: 1},
                            {name: 'soccerpidgeons', wins:7, losses:3, draws: 4}
                        ]

                    })

                    describe("and a win transition", function(){

                        var game, result, keyVals, keyTable
                        beforeEach(function(){
                            game = {home: 'liverbird', away: 'soccerpidgeons', outcome: 'W'}
                            result = instance.addGameToTable(mockTable, game)
                            keyVals = result.map(function(j){
                                return [j.name, j]
                            })
                            keyTable = _.object(keyVals)
                        })

                        it("should add win to home team", function(){
                            expect(keyTable['liverbird'].wins).toBe(5)

                        })
                        it("should add loss to away team", function(){
                            expect(keyTable['soccerpidgeons'].losses).toBe(4)
                        })

                    })
                    describe("and a draw transition", function(){
                        var game, result, keyVals, keyTable
                        beforeEach(function(){
                            game = {home: 'liverbird', away: 'soccerpidgeons', outcome: 'T'}
                            result = instance.addGameToTable(mockTable, game)
                            keyVals = result.map(function(j){
                                return [j.name, j]
                            })
                            keyTable = _.object(keyVals)
                        })

                        it("should add draw to home team", function(){
                            expect(keyTable['liverbird'].draws).toBe(2)

                        })
                        it("should add draw to away team", function(){
                            expect(keyTable['soccerpidgeons'].draws).toBe(5)
                        })

                    })
                    describe("and a loss transition", function(){
                        var game, result, keyVals, keyTable
                        beforeEach(function(){
                            game = {home: 'liverbird', away: 'soccerpidgeons', outcome: 'L'}
                            result = instance.addGameToTable(mockTable, game)
                            keyVals = result.map(function(j){
                                return [j.name, j]
                            })
                            keyTable = _.object(keyVals)
                        })

                        it("should add loss to home team", function(){
                            expect(keyTable['liverbird'].losses).toBe(6)

                        })
                        it("should add win to away team", function(){
                            expect(keyTable['soccerpidgeons'].wins).toBe(8)
                        })
                    })

                })

            })
        })

        describe("removeGameFromTable", function(){
            describe("scenario test", function(){

                describe("when given a table", function(){

                    var mockTable
                    beforeEach(function(){
                        mockTable = [
                            {name: 'liverbird', wins:4, losses:5, draws: 1},
                            {name: 'soccerpidgeons', wins:7, losses:3, draws: 4}
                        ]

                    })

                    describe("and a win transition", function(){

                        var game, result, keyVals, keyTable
                        beforeEach(function(){
                            game = {home: 'liverbird', away: 'soccerpidgeons', outcome: 'W'}
                            result = instance.removeGameFromTable(mockTable, game)
                            keyVals = result.map(function(j){
                                return [j.name, j]
                            })
                            keyTable = _.object(keyVals)
                        })

                        it("should remove win from home team", function(){
                            expect(keyTable['liverbird'].wins).toBe(3)

                        })
                        it("should remove loss from away team", function(){
                            expect(keyTable['soccerpidgeons'].losses).toBe(2)
                        })

                    })
                    describe("and a draw transition", function(){
                        var game, result, keyVals, keyTable
                        beforeEach(function(){
                            game = {home: 'liverbird', away: 'soccerpidgeons', outcome: 'T'}
                            result = instance.removeGameFromTable(mockTable, game)
                            keyVals = result.map(function(j){
                                return [j.name, j]
                            })
                            keyTable = _.object(keyVals)
                        })

                        it("should remove draw from home team", function(){
                            expect(keyTable['liverbird'].draws).toBe(0)

                        })
                        it("should remove draw from away team", function(){
                            expect(keyTable['soccerpidgeons'].draws).toBe(3)
                        })

                    })
                    describe("and a loss transition", function(){
                        var game, result, keyVals, keyTable
                        beforeEach(function(){
                            game = {home: 'liverbird', away: 'soccerpidgeons', outcome: 'L'}
                            result = instance.removeGameFromTable(mockTable, game)
                            keyVals = result.map(function(j){
                                return [j.name, j]
                            })
                            keyTable = _.object(keyVals)
                        })

                        it("should remove loss from home team", function(){
                            expect(keyTable['liverbird'].losses).toBe(4)

                        })
                        it("should remove win from away team", function(){
                            expect(keyTable['soccerpidgeons'].wins).toBe(6)
                        })
                    })

                })

            })
        })

        describe("generateRandomTransition", function(){

            describe("scenario test", function(){

                describe("when given arguments and a current season state", function(){

                    var result, current, selectRG, rGameOutcome, p
                    beforeEach(function(){

                        current = {
                            table: [],
                            games: [
                                {},
                                {
                                    outcome: "previous outcome"
                                }
                            ]
                        }

                        selectRG = function(){
                            return 1
                        }
                        rGameOutcome = function(){
                            return "gameOutcome"
                        }
                        p = function(){
                            return "computedTransitionProbability"
                        }

                        result = instance
                            .generatePossibleTransition(current, selectRG,
                                rGameOutcome, p)

                    })

                    it("should return a new season with selected game updated", function(){
                        expect(result.gameIndex).toBe(1)
                        expect(result.outcome).toBe("gameOutcome")
                        expect(result.probability).toBe("computedTransitionProbability")
                    })

                })
            })
        })

        describe("tableTransitionProbabilityEqual", function(){

            describe("when called", function(){

                var result
                beforeEach(function(){
                    result = instance.tableTransitionProbabilityEqual()
                })

                it("should return equal probabilty of W/L/T as 1/3", function(){
                    var difference = Math.abs(result - 1/3)
                    expect(difference < .001).toBe(true)
                })

            })

        })

        describe("tableTransitionProbabilityOdds", function(){

            describe("when given State and transitionState", function(){

                var mockState, mockTransitionState, result
                beforeEach(function(){
                    mockState = "mockState"
                    mockTransitionState = { probability: "setProbability" }
                    result = instance
                        .tableTransitionProbabilityOdds(mockState, mockTransitionState)

                })

                it("should return transitionStates probability", function(){
                    expect(result).toBe("setProbability")
                })

            })

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
                        gamesList = mockSeason.games

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

                        resultsTable = mockSeason.table

                        gamesList = mockSeason.games

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
