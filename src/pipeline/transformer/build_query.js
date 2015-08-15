/**
 * Created by r1cebank on 8/13/15.
 */

/*!
 *  After the output is aligned, we need to build the final query before we pass it to the db
 */

import _            from 'lodash';
import Promise      from 'bluebird';
import Datasource   from '../../datasources/datasource';


function _build_query(dsType) {

    //  Log TAG
    var TAG = "build_query";

    var datasource = new Datasource(dsType);

    //  Call the callback with current promise
    var _promise = this.promise; //  New promise to return if we have a pending promise
    if(this.promise instanceof Promise) {
        this.promise = new Promise((resolve, reject) => {
            _promise.then((result) => {
                //  Process the aligned input and query it
                var output = _.assign({ }, {beforeBuildQuery: this.output});
                resolve(output);
            }).catch(function (e) {
                reject(e);
            });
        });
    } else {
        AppSingleton.getInstance().L.info(TAG, "We have a no promise!");
        //  Process the input now since we have no primise to wait for
    }
    return this;   //  Resolve should be the last function in the chain
}

export default {buildQueryFor: _build_query};