/**
 * functional-match-case
 * --------------
 * `npm install functional-match-case`
 *  or
 * `yarn add functional-match-case`
 *
 * Example:
 *
 * Turn:
 *
 * switch(someValue) {
 *  case A:
 *  case B:
 *    return resultA;
 *  case C:
 *    return resultB;
 *  case D:
 *    return functionC();
 *  default:
 *    return defaultValue;
 * }
 *
 * Into:
 *
 * import matchCase from 'functional-match-case';
 *
 * const match = matchCase({
 *   [A]: resultA,
 *   [B]: resultA,
 *   [C]: resultB,
 *   [D]: functionC, // just the ref, will be called when needed
 * })(defaultValue);
 *
 * Then whenever needed:
 *
 * match(someValue);
 *
 * Extra benefits:
 *
 * Comparability of cases. For example:
 *
 * someMatchCase = {
 *   [A]: resultA,
 *   [B]: resultB,
 * };
 *
 * anotherMatchCase = {
 *   [C]: resultC,
 *   [D]: functionD,
 * }
 *
 * composedMatcher = matchCase({
 *    ...someMatchCase,
 *    ...anotherMatchCase,
 *    [F]: resultF,
 * })(defaultValue);
 *
 */

const executeIfFunction = require('execute-if-function');

/**
 * @param {Object} cases
 * @return {function(*): function(string|number=): *}
 */
const switchCaseHashMap = cases => defaultCase => key =>
  cases.hasOwnProperty(key) ? cases[key] : defaultCase;

/**
 * @param {Object} cases
 * @return {function(*=): function(string|number=): *}
 */
const matchCase = cases => defaultCase => key =>
  executeIfFunction(switchCaseHashMap(cases)(defaultCase)(key));

module.exports = matchCase;
