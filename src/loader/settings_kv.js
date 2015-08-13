/**
 * Created by r1cebank on 8/12/15.
 */

import AppSingleton     from '../util/appsingleton';
import TypeResolver     from '../util/settings_kv/typeResolver';

function load(result) {

    //  This instance is shared across the entire app life-cycle
    var sharedInstance = AppSingleton.getInstance();
    sharedInstance.settingsKV = { };

    //  Loading the keys from the database and updates the Appsingleton
    for(let row of result) {
        sharedInstance.settingsKV[row.key] = TypeResolver.resolveType(row.value, row.type);
    }
}

export default {load};