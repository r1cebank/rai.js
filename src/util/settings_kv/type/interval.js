/**
 * Created by r1cebank on 8/12/15.
 */

function resolver(value) {

    //  Using regex to match number and interval
    var regex           = /^([a-zA-Z]+)\(([0-9]*.[0-9]+)\)$/,
        interval        = ['day', 'hour', 'minute', 'second'],
        intervalValue   = [86400, 3600, 60, 1];

    //  First test the supplied string, if doesn't match return undefined
    if(!regex.test(value))  return undefined;
    var match = regex.exec(value);

    //  If the supplied interval is not found, return undefined
    if(interval.indexOf(match[1].toLowerCase()) == -1)    return undefined;
    return intervalValue[interval.indexOf(match[1].toLowerCase())] * match[2];
}

export default resolver;
