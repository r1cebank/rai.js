/**
 * Created by r1cebank on 8/13/15.
 */

/*!
 *  Not really a transformer, this just stores the input and sets output
 */

import _            from 'lodash';
import Promise      from 'bluebird';

function _input(req, setting) {

    //  Set the request and route
    this.setting = _.clone(setting);
    this.input = req; //  Made a copy of the request
    this.output = req;
    return this;
}

export default {input: _input};