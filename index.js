const executeIfFunction = require('execute-if-function');

/**
 * @param {Object} cases
 * @return {function(*): function(string|number=): *}
 */
var switchCaseHashMap = function switchCaseHashMap(cases) {
  return function (defaultCase) {
    return function (key) {
      return cases.hasOwnProperty(key) ? cases[key] : defaultCase;
    };
  };
};

/**
 * @param {Object} cases
 * @return {function(*=): function(string|number=): *}
 */
var matchCase = function matchCase(cases) {
  return function (defaultCase) {
    return function (key) {
      return executeIfFunction(switchCaseHashMap(cases)(defaultCase)(key));
    };
  };
};

module.exports = matchCase;
