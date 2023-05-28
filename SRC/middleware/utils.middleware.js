const db = require('../utils/db.js')
const utils = require('../utils/utils.js');
module.exports = function(req, res, next){
    req.dbs = db.paths
    req.utils = utils;
    next()
}