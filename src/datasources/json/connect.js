/**
 * Created by r1cebank on 8/18/15.
 */

/*!
 *  This file manages the connection between json and rai
 *  a connection represent a http request that downloads the json
 *  into server memory cache, still need a way to do this without downloading
 *  the entire json
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

            //  Fetch the json defined in the database
            Fetch(url).then(function (res) {
                resolve(res.json());
            });
        });
    }
    return new Promise(function (resolve) {

        //  Fetch the json defined in the database
        Fetch(url).then(function (res) {
            resolve(res.json());
        });
    });
}

export default {connect: _connect};