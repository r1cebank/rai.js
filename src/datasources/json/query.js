/**
 * Created by r1cebank on 8/18/15.
 */

/*!
 *  This is the query file, which is using Json path to query the json provided
 *  I wonder if there is a better way to do this. Currently it is fast and easy.
 */

import JPath        from 'jsonpath';
import Promise      from 'bluebird';

function _query(query, setting, table) {
    console.log(query);
    return new Promise((resolve) => {
        resolve(JPath.query(this.db, query));
    });
}

export default {query: _query};