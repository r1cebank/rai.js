/**
 * Created by r1cebank on 8/13/15.
 */

/*!
 *  This is the mail entry point for respond building, we will need to pass the appropriate input to each transform
 *  modules to finally get the final output
 */
import Chainable        from '../pipeline/chainable';
import AppSingleton     from '../util/appsingleton';
import _                from 'lodash';

function respond(req, res) {

    var TAG = "respond";    //  Log tag

    var sharedInstance = AppSingleton.getInstance();        //  Grab the shared instance contains all the routes
    var route = sharedInstance.path.get(req.path);          //  You shall have a instance!
    var setting = sharedInstance.appSettings[route.name];   //  Grab the app settings


    //  Start a new chainable instance
    var chain = new Chainable();
        chain.input(_.assign(req.query, req.body), setting)
            .execute(route.pre_query_script)
            .align(route.query_input)
            .buildQueryFor(route.data_source, route.query_input, route.query)
            .query(route.data_source_url, route.table_collection)
            .execute(route.post_query_script)
            .resolve(function () {
                res.send(JSON.stringify({results: chain.output}));
                if(chain.error) AppSingleton.getInstance().L.error(TAG, JSON.stringify(chain.error));
            });
}

export default {respond};
