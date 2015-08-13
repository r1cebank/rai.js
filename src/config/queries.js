/**
 * Created by r1cebank on 8/11/15.
 */

var config = {
    masterDB: {
        settings    :   "select system.key, system.value, system.type from system;",
        routes      :   "select apps.name, routes.* from apps join routes",
        apps        :   "select * from apps",
        appSettings :   "select apps.name, app_setting.* from app_setting join apps"
    }
};

export default config;