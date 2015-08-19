/**
 * Created by r1cebank on 8/15/15.
 */

/*!
 *  This is the event handler for cache expire
 */

import AppSingleton     from '../appsingleton';

var events = {
    expire: (key, value) => {

        //  Log tag
        var TAG = "cache:expire";

        AppSingleton.getInstance().L.warn(TAG, `Cache ${key}, has expired.`);
    }
}


export default events;