/**
 * Created by r1cebank on 8/14/15.
 */

/*!
 *  This file handles the actual query of the connection, very import stuff
 *  going on here
 */

import Mongodb      from 'mongodb';
import Promise      from 'bluebird';

Promise.promisifyAll(Mongodb);

function _query(query, setting, table) {


    //  Get the collection from db
    var collection = this.db.collection(table);

    //  Get query type from query
    var queryType = setting.REGEX_QUERY_TYPE.exec(query)[1];
    //  Trim the query
    query = JSON.parse(query.replace(setting.REGEX_QUERY_TYPE.exec(query)[0],'').trim());

    return new Promise((resolve, reject) => {
        collection[queryType](query).toArray().then((results) => {
            resolve(results);
        }).catch((e) => {
            reject(e);
        })
    });
}

export default {query: _query};