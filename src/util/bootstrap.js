/**
 * Created by r1cebank on 8/11/15.
 */

import AppSingleton     from './appsingleton';
import Winston          from 'winston';
import Hashmap          from 'hashmap';
import Cache            from 'node-cache';
import MySQL            from 'mysql';
import DB               from '../config/db';
import Promise          from 'bluebird';
import Queries          from '../config/queries';
import Chainable        from '../pipeline/chainable';


function bootstrap () {

    //  Log tag
    var TAG = "bootstrap";

    //  This instance is shared across the entire app life-cycle
    var sharedInstance = AppSingleton.getInstance();

    //  Creating a new shared instance for winston logger
    sharedInstance.Log = new (Winston.Logger)({
        transports: [
            new (Winston.transports.Console)({
                colorize: 'all'
            })
        ]
    });
    sharedInstance.L = {
        info    :   (tag, log) => {sharedInstance.Log.info(`[${tag}] : ${log}`);},
        error   :   (tag, log) => {sharedInstance.Log.error(`[${tag}] : ${log}`);},
        warn    :   (tag, log) => {sharedInstance.Log.warn(`[${tag}] : ${log}`);}
    };

    //  Path is used to cache API route definitions from master DB
    sharedInstance.path = new Hashmap();

    /*!
     *  dsCache is also called connection cache or datasource cache, it is used to store the connection between
     *  datasource and the server itself
     */
    sharedInstance.dsCache = new Cache({useClones: false});

    //  Here we will attach the masterDB connection
    sharedInstance.masterDB = MySQL.createConnection(DB.masterDB);
    sharedInstance.masterDB.connect();

    //  Get the promisified version of the mysql query
    sharedInstance.masterQuery = Promise.promisify(sharedInstance.masterDB.query, sharedInstance.masterDB);

    //  Now we need to query the masterDB for the information we need and store them as promises
    sharedInstance.dbQueries = Promise.props(
        {
            settingsKV  : sharedInstance.masterQuery(Queries.masterDB.settings),
            routes      : sharedInstance.masterQuery(Queries.masterDB.routes),
            apps        : sharedInstance.masterQuery(Queries.masterDB.apps),
            appSettings : sharedInstance.masterQuery(Queries.masterDB.appSettings)
        }
    );

    //  Load chainable modules and set the object
    //  sharedInstance.chainable = new Chainable(); //TODO disabled this due to thread unsafe.

    sharedInstance.L.info(TAG, "Bootstrap complete!");
}

module.exports = bootstrap;
