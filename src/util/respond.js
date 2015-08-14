/**
 * Created by r1cebank on 8/13/15.
 */

/*!
 *  This is the mail entry point for respond building, we will need to pass the appropriate input to each transform
 *  modules to finally get the final output
 */
import Chainable        from '../pipeline/chainable';
import AppSingleton     from '../util/appsingleton';

function respond(req, res) {

    var sharedInstance = AppSingleton.getInstance();    //  Grab the shared instance contains all the routes
    var route = sharedInstance.path.get(req.path);      //  You shall have a instance!

    //  Start a new chainable instance
    var chain = new Chainable();
        chain.input(req)
            .execute(route.pre_query_script)
            .align(route.pre_query_output)
            .resolve(function () {
                res.send(chain.output);
            });
}

export default {respond};