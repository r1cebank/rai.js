/**
 * Created by r1cebank on 8/14/15.
 */

/*!
 *  This file handles the connection between mongodb and rai
 *  connect will return a promise for the connection or a
 *  a promise wrapped cached connection
 */

import Mongodb        from 'mongodb';
import Promise      from 'bluebird';

Promise.promisifyAll(Mongodb);

function _connect(url) {
    return Mongodb.MongoClient.connect(url);
}

export default {connect: _connect};