/**
 * Created by r1cebank on 8/13/15.
 */

/*!
 *  This transformer execute unsafe code and set the appropriate output
 */

import _            from 'lodash';
import exec         from '../../util/exec';

function _execute(script) {

    //  Create a new sandbox for code execution
    if(!script) {

        // If no script is provided, exit and set output to the input
        this.output = _.assign({ passThrough: true }, this.input);
        return this;
    } else {

        //  I have no choise to do this, i wanted to sync wait, it is a pipe anyways, no need for async.
        this.promise = exec(this.input, script);
    }
    return this;
}

export default {execute: _execute};