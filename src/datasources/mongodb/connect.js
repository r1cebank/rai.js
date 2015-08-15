/**
 * Created by r1cebank on 8/14/15.
 */

/*!
 *  This file handles the connection between mongodb and rai
 *  connect will return a promise for the connection or a
 *  a promise wrapped cached connection
 */

import Mongodb          from 'mongodb';
import Promise          from 'bluebird';
import AppSingleton     from '../../util/appsingleton';

Promise.promisifyAll(Mongodb);
Promise.promisify(AppSingleton.getInstance().dsCache.get, AppSingleton.getInstance().dsCache);
Promise.promisify(AppSingleton.getInstance().dsCache.set, AppSingleton.getInstance().dsCache);

function _connect(url) {

    var TAG = "connect:mongodb";

    //  Get sharedinstance for getting the cached connections
    var sharedInstance = AppSingleton.getInstance();

    //  Try to get the connection from the cache
    if(sharedInstance.dsCache.get(url)) {
        return new Promise(function (resolve) {
            sharedInstance.L.info(TAG, "connection cached, returning cached connection");
            resolve(sharedInstance.dsCache.get(url));
        });
    } else {
        sharedInstance.L.warn(TAG, "no connection cached, setting up new connection");
        return Mongodb.MongoClient.connect(url);
    }
    return Mongodb.MongoClient.connect(url);
}

export default {connect: _connect};