/**
 * Created by r1cebank on 8/13/15.
 */

/*!
 *  After the output is aligned, we need to build the final query before we pass it to the db
 */

import _            from 'lodash';
import Promise      from 'bluebird';
import Datasource   from '../../datasources/datasource';


function _build_query(dsType, outputs, rawQuery) {

    //  Log TAG
    var TAG = "build_query";

    this.datasource = new Datasource(dsType);

    //  Call the callback with current promise
    var _promise = this.promise; //  New promise to return if we have a pending promise
    if(this.promise instanceof Promise) {
        this.promise = new Promise((resolve, reject) => {
            _promise.then((result) => {
                this.output = result;
                //  Process the aligned input and query it
                var query = this.datasource.buildQuery(_.clone(this.output), JSON.parse(outputs), rawQuery, this.setting);
                var output = _.clone({query});
                output.beforeBuildQuery = this.output;
                resolve(output);
            }).catch(function (e) {
                reject(e);
            });
        });
    } else {
        AppSingleton.getInstance().L.info(TAG, "We have a no promise!");
        //  Process the aligned input and query it
        var query = this.datasource.buildQuery(_.clone(this.output), JSON.parse(outputs), rawQuery, this.setting);
        this.output = _.clone({query});
        this.output.beforeBuildQuery = this.output;
        //  Process the input now since we have no promise to wait for
    }
    return this;
}

export default {buildQueryFor: _build_query};