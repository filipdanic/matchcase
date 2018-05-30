const test = require('tape');
const matchCase  = require('./index');

test('it works as a simple hash map with default value', (t) => {
  t.plan(3);
  const match = matchCase({ A: 1, B: 2 })(3);
  t.equal(match('A'), 1);
  t.equal(match('B'), 2);
  t.equal(match('C'), 3);
  t.end();
});

test('it evaluates function when needed', (t) => {
  t.plan(1);
  const fn = () => 10;
  const match = matchCase({ A: fn })();
  t.equal(match('A'), 10);
  t.end();
});
