/**
 * Created by r1cebank on 8/12/15.
 */

/*!
 *  After bootstrap, all the necessary promises, values are defined in AppSingleton
 *  In startup.js we will begin loading the appropriate routes, settings and appsettings
 */

import AppSingleton     from './appsingleton';
import Promise          from 'bluebird';
import TypeResolver     from './settings_kv/typeResolver'

function startup() {

    //  This instance is shared across the entire app life-cycle
    var sharedInstance = AppSingleton.getInstance();
    return new Promise(function (resolve, reject) {
        sharedInstance.dbQueries.then(function (result) {

            //  This loads the settings KV into AppSingleton
            sharedInstance.settingsKV = { };
            for(let row of result.settingsKV[0]) {
                sharedInstance.settingsKV[row.key] = TypeResolver.resolveType(row.value, row.type);
            }
            resolve();
            if(1!=1) reject(); //   TODO: Remove this when have real reject, now suppress warnings.
        });
    });
}
export default startup;