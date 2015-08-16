/**
 * Created by r1cebank on 8/13/15.
 */

/*!
 *  Resolves into the final output, if there is a promise not resolved, wait for that promise
 */

import Promise      from 'bluebird';
import _            from 'lodash';
import AppSingleton from '../../util/appsingleton';

function _resolve(callback) {

    //  Log TAG
    var TAG = "resolve";

    //  Call the callback with current promise
    if(this.promise instanceof Promise) {
        if(!this.promise.isFulfilled()) {   //  Good, the world is awesome
            AppSingleton.getInstance().L.warn(TAG, "We have a unresolved promise!");
            AppSingleton.getInstance().L.warn(TAG, "Waiting for promise to finish");

            //  Wait for the promise
            this.promise.then((result) => {
                AppSingleton.getInstance().L.info(TAG, "We have a resolved promise!");
                this.output = _.clone(result);
                callback();   //  Better chaining
            })
                .catch((e) => {
                    AppSingleton.getInstance().L.error(TAG, "We have a rejected promise!");
                    this.error = _.clone(e); //  Huston, we have a problem
                    console.log(this);
                    this.output.error = _.clone(e);
                    this.output = _.clone(this.input);
                    callback();   //  Better chaining
                });
        } else if(this.promise.isFulfilled()) { //  We have a resolved promise, get the value from it and resolve that
            AppSingleton.getInstance().L.info(TAG, "We have a resolved promise!");
            this.output = _.clone(this.promise.value());
            callback(this.output);   //  Better chaining
        } else if(this.promise.isRejected()) {  //  We have a rejected promise, get the error, add to input and error
            AppSingleton.getInstance().L.error(TAG, "We have a rejected promise!");
            this.output.error = this.promise.reason();
            this.output = _.clone(this.input);
            this.error = this.promise.reason();
            callback();   //  Better chaining
        }
    } else {
        AppSingleton.getInstance().L.info(TAG, "We have a no promise!");
        callback();
    }
    return this;
}

export default {resolve: _resolve};