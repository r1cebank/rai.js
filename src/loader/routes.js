/**
 * Created by r1cebank on 8/12/15.
 */

import AppSingleton     from '../util/appsingleton';
import TypeResolver     from '../util/settings_kv/typeResolver';
import Respond          from '../util/respond';

function load(result) {

    //  Log TAG
    var TAG = "load:route";

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
            sharedInstance.L.info(TAG, `Setting route for: /${row.name}${row.path}`);
            sharedInstance.app.all(`/${row.name}${row.path}`, function (req, res) {
                Respond.respond(req, res);
            });
        } else if (sharedInstance.settingsKV.REGEX_PSEUDO_PATH.test(row.path)) {
            sharedInstance.L.info(TAG, `Setting pseudo route for: /${row.name}${row.path}`);
        } else {
            //  Path failed test, skipping..
        }

    }
}

export default {load};