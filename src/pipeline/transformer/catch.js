/**
 * Created by r1cebank on 8/13/15.
 */

/*!
 *  Not really a transformer, this just spits out error
 */

function _catch(callback) {
    //  Call the callback with error supplied
    callback(this.error);
    return this;
}

export default {catch: _catch};