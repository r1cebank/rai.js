/**
 * Created by r1cebank on 8/11/15.
 */

var config = {
    masterDB: {
        settings    :   "select system.key, system.value, system.type from system;",
        routes      :   "select routes.*, apps.name from apps join routes",
        apps        :   "select * from apps",
        appSettings :   "select * from app_setting"
    }
};

export default config;