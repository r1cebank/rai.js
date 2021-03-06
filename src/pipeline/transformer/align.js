/**
 * Created by r1cebank on 8/13/15.
 */

/*!
 *  After the script, we need to align output using pre_query_output to map the result into array for easy processing
 */

import _            from 'lodash';
import Promise      from 'bluebird';
import AppSingleton from '../../util/appsingleton';

/*!
 *  I am quite shamed of myself since most of the code is copied from resolve.js
 *  --I think I felt better about myself now--
 */

function _align(output_map) {

    //  Log TAG
    var TAG = "align";

    //  Call the callback with current promise
    var _promise = this.promise; //  New promise to return if we have a pending promise
    if(this.promise instanceof Promise) {
        this.promise = new Promise(function (resolve, reject) {
            _promise.then(function (result) {
                var output = { };
                output[0] = result;     //  For psudo route passthrough
                for(var key of JSON.parse(output_map)) {
                    output[JSON.parse(output_map).indexOf(key) + 1] = result[key];
                }
                resolve(output);
            }).catch(function (e) {
                reject(e);
            });
        });
    } else {
        AppSingleton.getInstance().L.info(TAG, "We have a no promise!");
        this.output = { };
        for(var key of output_map) {
            this.output[key] = result[key];
        }
    }
    return this;
}

export default {align: _align};