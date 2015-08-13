/**
 * Created by r1cebank on 8/12/15.
 */

/*!
 *  In settings_kv there are many value types, some needs to be converted to their correct type
 *  resolveType will be used to convert all known type to their appropriate type.
 */

import Types        from './types';

function resolveType(value, type) {

    //  If resolver is not defined, return undefined
    if(!Types[type])    return undefined;

    //  Import the resolver from types
    let resolver = require(Types[type].resolver);

    //  Call the resolver and return the resolved type
    return resolver(value);

}

export default {resolveType};