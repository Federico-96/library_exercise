// const db = require('../utils/db.js')
// const utils = require('../utils/utils.js');

import {paths} from "../utils/db.js";
import { Utils } from "../utils/utils.js";

export function utilsMiddleware (req, res, next) {
    req.dbs = paths;
    req.utils = Utils;
    next()
};