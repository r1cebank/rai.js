/**
 * Created by r1cebank on 8/13/15.
 */

/*!
 *  Not really a transformer, this just spits out error
 */

import _    from 'lodash';

function _input(req) {

    //  Set the request and route
    this.input = _.assign(req.query, req.body);
    return this;
}

export default {input: _input};