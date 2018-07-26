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

test('README example works', (t) => {
  const A = 'A';
  const B = 'B';
  const C = 'C';
  const D = 'D';
  const resultA = 1;
  const resultB = 2;
  const functionC = () => 3;
  const defaultValue = 4;
  const match = matchCase({
    [A]: resultA,
    [B]: resultA,
    [C]: resultB,
    [D]: functionC,
  })(defaultValue);
  t.plan(5);
  t.equal(match(A), resultA);
  t.equal(match(B), resultA);
  t.equal(match(C), resultB);
  t.equal(match(D), functionC());
  t.equal(match(), defaultValue);
  t.end();
});
