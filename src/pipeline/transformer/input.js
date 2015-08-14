/**
 * Created by r1cebank on 8/13/15.
 */

/*!
 *  Not really a transformer, this just spits out error
 */

import _            from 'lodash';
import Promise      from 'bluebird';

function _input(req) {

    //  Set the request and route
    this.input = _.assign(req.query, req.body); //  Made a copy of the request
    this.output = _.assign(req.query, req.body);
    return this;
}

export default {input: _input};