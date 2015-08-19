/**
 * Created by r1cebank on 8/18/15.
 */

import JPath        from 'jsonpath';
import Promise      from 'bluebird';

function _query(query, setting, table) {
    return new Promise((resolve) => {
        resolve(JPath.query(this.db, query));
    });
}

export default {query: _query};