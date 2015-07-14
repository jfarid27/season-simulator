(function(){

    define(function (require, exports, module) {

        describe("Transition Module", function(){
            describe("Metropolis step", function(){
                describe("scenario test", function(){
                    describe("when b state is more likely than a ", function(){

                        var mockRandomUniform, instance, response
                        beforeEach(function(){
                            mockRandomUniform = function() { return .2 }
                            instance = require("src/transition")(mockRandomUniform)
                            response = instance.metropolis(1, 2)
                        })
                        it("should return true", function(){
                            expect(response).toBeTruthy()
                        })
                    })
                    describe("when a state is more likely than b", function(){
                        describe("and randomUniform is less than the odds of a transition", function(){

                            var mockRandomUniform, instance, response
                            beforeEach(function(){
                                mockRandomUniform = function() { return .2 }
                                instance = require("src/transition")(mockRandomUniform)
                                response = instance.metropolis(.75, .25)
                            })
                            it("should return true", function(){
                                expect(response).toBeTruthy()
                            })
                        })
                        describe("and randomUniform is greater than the odds of a transition", function(){

                                var mockRandomUniform, instance, response
                                beforeEach(function(){
                                    mockRandomUniform = function() { return .8 }
                                    instance = require("src/transition")(mockRandomUniform)
                                    response = instance.metropolis(.75,.25)
                                })
                                it("should return false", function(){
                                    expect(response).toBeFalsy()
                                })
                        })
                    })
                })
            })
        })

    });
})()
