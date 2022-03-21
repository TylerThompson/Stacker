'use strict';

const t = require('tap');
const cases = require('./fixtures/parse-fixture.json');
const lines = Object.keys(cases);
const Stacker = require('../');
const stacker = new Stacker();

t.plan(lines.length * 2);
lines.forEach(line => {
  const expect = cases[line];
  t.match(stacker.parseLine(line), expect, JSON.stringify(line));
  line = line.replace(/^ {4}at /, '');
  t.match(stacker.parseLine(line), expect, JSON.stringify(line));
});
