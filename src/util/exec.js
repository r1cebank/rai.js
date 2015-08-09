/**
 * exec(2): Executes untrusted code.
 *
 * @author  Siyuan Gao <siyuangao@gmail.com>
 * @license Apache 2.0
 */

import Bluebird    from 'bluebird';
import LocalEval   from 'localeval';

/*!
 * Wrap the code into IIFE
 */
const CODE_WRAP = `
  var output = Object.create(null);
  (function(input, output) {
    <%= CODE %>
  })(this.input, output) || output;
`;

/*!
 * Promisify localeval(4)
 */
const __eval = Bluebird.promisify(LocalEval);

/**
 * exec(2): Executes untrusted code.
 *
 * @param  {input} script input.
 * @param  {code} code to run.
 * @return Result of execution.
 */
export default function exec(input, code, timeout = 1000) {

  if (!code) { return Bluebird.resolve(input); }

  /* wrap the code into an IIFE */
  code = CODE_WRAP.replace('<%= CODE %>', code);

  /* evaluate the code expression */
  return __eval(code, { input: input || { } }, timeout);

}
