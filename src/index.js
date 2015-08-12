/**
 * Rai.js entry file.
 *
 * @author  Siyuan Gao <siyuangao@gmail.com>
 * @author  Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license Apache 2.0
 */

require("babel/polyfill"); //   Needed for some babel functions, remove after ES6
console.warn("Remember to remove this after ES6.");

import Express      from 'express';
import Errorface    from 'errorface';
import BodyParser   from 'body-parser';
import AppSingleton from './util/appsingleton';
import Bootstrap    from './util/bootstrap';

/*!
 * Enable sourcemap support (if present)
 */
let sourcemaps = require.resolve('source-map-support');
if (sourcemaps) { require(sourcemaps).install(); }

/*!
 * Root express application.
 */
let app = Express();

/*!
 * Bootstrap the application, setting the proper shared variables in AppSingleton
 */
Bootstrap();

console.error("You should not see this on production!");

/*!
 * Use global express middleware here.
 */
app.use(BodyParser.json()); //Using bodyparser for POST requests
app.use(BodyParser.urlencoded({ extended: false }));
app.use(Errorface.errorHandler());  //Using errorface for detailed error handling, REMOVE in production.
