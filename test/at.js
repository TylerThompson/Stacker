'use strict';
// some capture edge cases not already covered by other tests

const Stacker = require('../');
const t = require('tap');

const stacker = new Stacker();

// a capture with no function, not much to it, actually
const base = __filename.slice(process.cwd().length + 1).replace(/\\/g, '/');
t.match(stacker.at(), { line: Number, column: Number, file: base });

// a capture from a native site
const arr = [ 0 ];
const captures = arr.map(function xyz () {
  return stacker.at(xyz);
});
t.match(captures, [ {
  type: 'Array',
  function: 'map'
} ]);
