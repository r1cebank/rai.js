/**
 * Created by r1cebank on 8/18/15.
 */

/*!
 *  This is the required method for every datasource module, this is used to build query before send
 *  them to the db, since most of the time query will look like this: $[?(@.$1==[1])]
 *  copied from mongodb
 */

function _buildQuery(data, outputs, query, setting) {

    //  Never declare variable in a loop
    var match = "",
        match0 = "",
        key = "";

    // replace query params
    do {
        // Loop until regex no longer match item
        match = setting.REGEX_QUERY_PARAM.exec(query)[1];       //  Get the param number
        match0 = setting.REGEX_QUERY_PARAM.exec(query)[0];      //  Get the actual match
        key = outputs[match - 1];                               //  Get the key name
        query = query.replace(match0, key);                     //  Replace the key with actual value name
    } while(setting.REGEX_QUERY_PARAM.test(query));

    //  replace the values in a loop
    do {
        // Loop until regex no longer match item
        match = setting.REGEX_QUERY_VALUE.exec(query)[1];
        match0 = setting.REGEX_QUERY_VALUE.exec(query)[0];
        key = data[match];
        query = query.replace(match0, key);
    } while(setting.REGEX_QUERY_VALUE.test(query));

    return query;
}

export default {buildQuery: _buildQuery};