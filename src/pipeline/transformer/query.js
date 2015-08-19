/**
 * Created by r1cebank on 8/14/15.
 */

/*!
 *  Finally! we have reached this step, this is the most important part of rai
 *  We have the query built, now we need to invoke datasource class to get the actual
 *  data.
 */

import _                from 'lodash';
import Promise          from 'bluebird';
import AppSingleton     from '../../util/appsingleton';

function _query(url, table) {

    var sharedInstance = AppSingleton.getInstance();

    //  Log TAG
    var TAG = "query";

    //  Call the callback with current promise
    var _promise = this.promise; //  New promise to return if we have a pending promise
    if(this.promise instanceof Promise) {
        this.promise = new Promise((resolve, reject) => {
            _promise.then((result) => {
                this.output = result;
                //  Connect the db, query and return the data
                this.datasource.connect(url).then((db) => {


                    if(!sharedInstance.dsCache.get(url)) {
                        //  Updates the cache
                        sharedInstance.dsCache.set(url, db);
                        sharedInstance.L.info(TAG, "restoring db connection from cache");
                    }
                    this.datasource.db = db;
                    this.datasource.query(this.output.query, this.setting, table).then((results) => {
                        resolve(results);
                    }).catch(function (e) {reject(e);});
                }).catch(function (e) {reject(e);});
            }).catch(function (e) {
                reject(e);
            });
        });
    } else {
        AppSingleton.getInstance().L.info(TAG, "We have a no promise!");
        //  Process the query

    }
    return this;
}

export default {query: _query};