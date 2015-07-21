var instance, mockSeason, mcmc, _

_ = require('./node_modules/underscore/underscore')

instance = require('./src/seasons')(_)
mcmc = require('./src/transition')(Math.random)
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

var observable = function(season, observationCounts, params){

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

var cb = function(data){
    console.log(data)
    var difference = data.probability - .5
    console.log(Math.abs(difference) < .01)
}

var observationCounts = {
    'probability': 0,
    'totals': 0
}
instance.defaultSimulation(mockSeason, 1000000, observable, observationCounts, mcmc.simulation, cb)
