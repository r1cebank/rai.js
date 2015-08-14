/**
 * Created by r1cebank on 8/13/15.
 */

import Chainable        from '../pipeline/chainable'

function respond(req, res) {
    var chain = new Chainable();
        chain.input(req);
    res.send(chain);
}

export default {respond};