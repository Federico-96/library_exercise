// const db = require('../utils/db.js')
// const utils = require('../utils/utils.js');

import {db} from "../utils/db.js";
import { utils } from "../utils/utils.js";

export function utilsMiddleware (req, res, next) {
    req.dbs = db.paths
    req.utils = utils;
    next()
};