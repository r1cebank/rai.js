/**
 * Created by r1cebank on 8/13/15.
 */

/*!
 *  This transformer execute unsafe code and set the appropriate output
 */

import _            from 'lodash';
import Promise      from 'bluebird';
import exec         from '../../util/exec';
import AppSingleton from '../../util/appsingleton';

function _execute(script) {

    //  Log TAG
    var TAG = "execute";

    //  Call the callback with current promise
    var _promise = this.promise; //  New promise to return if we have a pending promise
    if(this.promise instanceof Promise) {
        AppSingleton.getInstance().L.warn(TAG, "We have a unresolved promise!");
        this.promise = new Promise((resolve, reject) => {
            _promise.then((results) => {

                this.output = _.clone(results);    //  Merge output

                //  If output is empty, resolve now
                if(_.isEmpty(this.output)) {
                    AppSingleton.getInstance().L.warn(TAG, "Trying to run script on empty input.");
                    resolve(this.output);
                }

                //  Create a new sandbox for code execution
                if(!script) {
                    // If no script is provided, exit and set output to the input
                    this.promise = new Promise((resolve) => {
                        this.output.passThrough = true;
                        resolve(_.clone(this.output));
                    });
                } else {
                    //  I have no choose to do this, i wanted to sync wait, it is a pipe anyways, no need for async.
                    this.promise = exec(this.output, _.clone(script)).then((result) => {
                        resolve(result);
                    }).catch((e) => {reject(e);});
                }
            }).catch(function (e) {
                reject(e);
            });
        });
    } else {
        AppSingleton.getInstance().L.info(TAG, "We have a no promise!");

        //  If output is empty, return now
        if(_.isEmpty(this.output)) {
            AppSingleton.getInstance().L.warn(TAG, "Trying to run script on empty input.");
            this.promise = new Promise((resolve) => {
                resolve(this.output);
            });
            return this;
        }

        //  Create a new sandbox for code execution
        if(!script) {

            // If no script is provided, exit and set output to the input
            this.output.passThrough = true;
            this.output = _.clone(this.output);
            this.promise = new Promise((resolve) => {
                resolve(this.output);
            });
        } else {

            //  I have no choose to do this, i wanted to sync wait, it is a pipe anyways, no need for async.
            this.promise = exec(this.output, _.clone(script));
        }
    }
    return this;
}

export default {execute: _execute};