/**
 * Created by r1cebank on 8/13/15.
 */

/*!
 *  Not really a transformer, this just spits out error
 */

function _resolve(callback) {
    //  Call the callback with current promise
    callback(this.promise);
    return this;
}

export default {resolve: _resolve};