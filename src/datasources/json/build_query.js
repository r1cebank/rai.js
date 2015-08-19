/**
 * Created by r1cebank on 8/11/15.
 */

function _buildQuery(data, outputs, query, setting) {
    return '$[?(@.country=="China")]';
}

export default {buildQuery: _buildQuery};