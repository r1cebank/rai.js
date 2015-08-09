/**
 * Rai.js entry file.
 *
 * @author  Siyuan Gao <siyuangao@gmail.com>
 * @author  Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license Apache 2.0
 */

import Fs          from 'fs';
import Winston     from 'winston';
import Express     from 'express';
import Cluster     from 'cluster';
import ClusterHub  from 'clusterhub';
import Errorface   from 'errorface';
import BodyParser  from 'body-parser';

/*!
 * Enable sourcemap support (if present)
 */
let sourcemaps = require.resolve('source-map-support');
if (sourcemaps) { require(sourcemaps).install(); }

/*!
 * Setup winston logging.
 */
Winston.cli();
Winston.level = 'verbose';

/*!
 * Root express application.
 */
let app = Express();

/*!
 * Use global express middleware here.
 */
app.use(BodyParser.json());
app.use(BodyParser.urlencded({ extended: false }));
