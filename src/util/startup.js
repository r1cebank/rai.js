/**
 * Created by r1cebank on 8/12/15.
 */

/*!
 *  After bootstrap, all the necessary promises, values are defined in AppSingleton
 *  In startup.js we will begin loading the appropriate routes, settings and appsettings
 */

import AppSingleton     from './appsingleton';
import Promise          from 'bluebird';
import TypeResolver     from './settings_kv/typeResolver';
import SettingsKVLoader from '../loader/settings_kv';
import AppsLoader       from '../loader/apps';
import AppSettingLoader from '../loader/app_settings';
import Routes           from '../loader/routes';

function startup() {

    //  This instance is shared across the entire app life-cycle
    var sharedInstance = AppSingleton.getInstance();
    return new Promise(function (resolve, reject) {
        sharedInstance.dbQueries.then(function (result) {

            //  This loads the settings KV into AppSingleton
            SettingsKVLoader.load(result.settingsKV[0]);

            //  Now loads all the apps defined in the system.
            AppsLoader.load(result.apps[0]);

            //  This loads all the app settings to the system.
            AppSettingLoader.load(result.appSettings[0]);

            /*!
             *  The most important part of this app, setting up the routes for this application
             */
            Routes.load(result.routes[0]);

            if(result.settingsKV[2] || result.apps[2] || result.appSettings[2] || result.routes[2]) {
                reject(new Error('Error when executing dbQueries'));
            } else {
                resolve();
            }
        });
    });
}
export default startup;