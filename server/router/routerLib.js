const Lanter = require("../page/lanter")
const Investigate = require("../page/investigate")
module.exports = {
    "POST/Lanter/sendResult" : Lanter.sendResult,
    "POST/Lanter/getRank" : Lanter.getRank,
    "POST/Invest/sendResult" : Investigate.investResult,
    "GET/Invest/getResult" : Investigate.showInvestList
}