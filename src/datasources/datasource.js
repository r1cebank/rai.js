/**
 * Created by r1cebank on 8/11/15.
 */

/*!
 *  The datasource class is very special, we first create the datasource class and load the modules needed for that
 *  datasource type
 */

import _                from 'lodash';
import Promise          from 'bluebird';
import AppSingleton     from '../util/appsingleton';

class Datasource {
    constructor(dsType) {

        this.TAG = `datasource:${dsType}`;

        //  Set default values

        //  Filename regex
        var regex = /^([a-z0-9_]+).js$/;

        //  Loading all transformer modules
        var filenames = require("fs").readdirSync(require("path").join(__dirname, dsType));

        //  Loop through the files and load them into the chainable class.
        for(var file of filenames) {
            if(regex.test(file)) {
                AppSingleton.getInstance().L.info(this.TAG, `Loading module: ${file}`);
                _.assign(this, require(`./${dsType}/${regex.exec(file)[1]}`));
            }
        }
    }
}

export default Datasource;