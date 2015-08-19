/**
 * Created by r1cebank on 8/18/15.
 */

/*!
 *  This file handles the connection between mongodb and rai
 *  connect will return a promise for the connection or a
 *  a promise wrapped cached connection
 */

import Fetch            from 'node-fetch';
import Promise          from 'bluebird';
import AppSingleton     from '../../util/appsingleton';

Fetch.promise = Promise;
Promise.promisify(AppSingleton.getInstance().dsCache.get, AppSingleton.getInstance().dsCache);
Promise.promisify(AppSingleton.getInstance().dsCache.set, AppSingleton.getInstance().dsCache);

function _connect(url) {

    var TAG = "connect:json";

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
        return new Promise(function (resolve) {
            Fetch(url).then(function (res) {
                resolve(res.json());
            });
        });
    }
    return new Promise(function (resolve) {
        Fetch(url).then(function (res) {
            resolve(res.json());
        });
    });
}

export default {connect: _connect};