/**
 * Created by r1cebank on 8/13/15.
 */

/*!
 *  Not really a transformer, this just spits out error
 */

function _done() {

    //  Clean up, close connections
    this.promise.done();    //  Complete the promise
    return undefined;
}

export default {done: _done};