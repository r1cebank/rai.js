/**
 * Created by r1cebank on 8/11/15.
 */

import AppSingleton     from './appsingleton';

function bootstrap () {
    var sharedInstance = AppSingleton.getInstance();
    //  Set the bootstrap status for error checking
    sharedInstance.bootstrapStatus = true;
}

module.exports = bootstrap;