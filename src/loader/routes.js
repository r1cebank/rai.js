/**
 * Created by r1cebank on 8/12/15.
 */

import AppSingleton     from '../util/appsingleton';
import TypeResolver     from '../util/settings_kv/typeResolver';

function load(result) {

    //  This instance is shared across the entire app life-cycle
    var sharedInstance = AppSingleton.getInstance();

    //  Needs to clear the cache before loading
    sharedInstance.path.clear();

    //  Loading the keys from the database and updates the Appsingleton
    for(let row of result) {

        //  Updates the routecache
        sharedInstance.path.set(`/${row.name}${row.path}`, row);
        //  Check path type
        if(sharedInstance.settingsKV.REGEX_API_PATH.test(row.path)) {
            //  Set the express route
            sharedInstance.L.info(`Setting route for: /${row.name}${row.path}`);
            sharedInstance.app.all(`/${row.name}${row.path}`, function (req, res) {
                res.send(sharedInstance.path.get(req.path));
            });
        } else if (sharedInstance.settingsKV.REGEX_PSEUDO_PATH.test(row.path)) {
            sharedInstance.L.info(`Setting pseudo route for: /${row.name}${row.path}`);
        } else {
            //  Path failed test, skipping..
        }

    }
}

export default {load};