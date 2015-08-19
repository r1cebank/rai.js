/**
 * Created by r1cebank on 8/13/15.
 */

/*!
 *  To make this looks like eye candy, I decided to use chaining to manipulate the data, the chainer will attach
 *  all available modules on creation.
 */

import _                from 'lodash';
import Promise          from 'bluebird';
import AppSingleton     from '../util/appsingleton';

class Chainable {
    constructor() {

        //  Log tag
        this.TAG = "chainable";

        //  Set default values
        this.error      = undefined;
        this.input      = { };
        this.output     = { };

        //  Filename regex
        var regex = /^([a-z0-9_]+).js$/;

        //  Loading all transformer modules
        var filenames = require("fs").readdirSync(require("path").join(__dirname,'transformer'));

        //  Loop through the files and load them into the chainable class.
        for(var file of filenames) {
            if(regex.test(file)) {
                AppSingleton.getInstance().L.info(this.TAG, `Loading module: ${file}`);
                _.assign(this, require(`./transformer/${regex.exec(file)[1]}`));
            }
        }
    }
}

export default Chainable;