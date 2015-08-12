/**
 * Created by r1cebank on 8/11/15.
 */

import AppSingleton     from './appsingleton';
import Winston          from 'winston';
import Hashmap          from 'hashmap';
import Cache            from 'node-cache';
import MySQL            from 'mysql';
import DB               from '../config/db.js'

function bootstrap () {

    //  This instance is shared across the entire app life-cycle
    var sharedInstance = AppSingleton.getInstance();

    //  Creating a new shared instance for winston logger
    sharedInstance.L = new (Winston.Logger)({
        transports: [
            new (Winston.transports.Console)({
                colorize: 'all'
            })
        ]
    });

    //  Path cache is used to cache API route definitions from master DB
    sharedInstance.pathCache = new Hashmap();

    /*!
     *  dsCache is also called connection cache or datasource cache, it is used to store the connection between
     *  datasource and the server itself
     */
    sharedInstance.dsCache = new Cache({useClones: false});

    //  Here we will attach the masterDB connection
    sharedInstance.masterDB = MySQL.createConnection(DB.masterDB);
    sharedInstance.masterDB.connect();

    //  Set the bootstrap status for error checking
    sharedInstance.bootstrapStatus = "SUCCESS";
}

module.exports = bootstrap;
