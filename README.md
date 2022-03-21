
<p align="center">
  <img alt="Stacker Logo" src="stacker-logo.png?raw=true" style="width: 200px;" />
</p>
<h1 align="center">Stacker</h1>

> Capture stack traces with ease

[![GitHub issues](https://img.shields.io/github/issues/TylerThompson/Stacker)](https://github.com/TylerThompson/Stacker/issues)
[![Coverage Status](https://coveralls.io/repos/TylerThompson/Stacker/badge.svg?branch=main&service=github)](https://coveralls.io/github/TylerThompson/Stacker?branch=main)
[![GitHub forks](https://img.shields.io/github/forks/TylerThompson/Stacker)](https://github.com/TylerThompson/Stacker/network)
[![GitHub stars](https://img.shields.io/github/stars/TylerThompson/Stacker)](https://github.com/TylerThompson/Stacker/stargazers)
[![GitHub license](https://img.shields.io/github/license/TylerThompson/Stacker)](https://github.com/TylerThompson/Stacker)

## Install

```
$ npm install --save @tylerthompson/stacker
```

## Usage

```js
const Stacker = require('stacker');
const stacker = new Stacker({cwd: process.cwd(), internals: Stacker.nodeInternals()});
// outputs a beautiful stack trace that you can read with ease
console.log(stacker.clean(new Error().stack));
```


## Docs
> Who doesn't want to expand their knowledge of the tools they use?
### new Stacker([options])

Creates a new `Stacker` instance.

#### options

##### internals

Type: `array` of `RegularExpression`s  

A set of regular expressions that match internal stack stack trace lines which should be culled from the stack trace.
The default is `Stacker.nodeInternals()`, this can be disabled by setting `[]` or appended using
`Stacker.nodeInternals().concat(additionalRegExp)`.  See also `ignoredPackages`.

##### ignoredPackages

Type: `array` of `string`s

An array of npm modules to be culled from the stack trace.  This list will mapped to regular
expressions and merged with the `internals`.

Default `''`.

##### cwd

Type: `string`

The path to the current working directory. File names in the stack trace will be shown relative to this directory.

##### wrapCallSite

Type: `function(CallSite)`

A mapping function for manipulating CallSites before processing. The first argument is a CallSite instance, and the function should return a modified CallSite. This is useful for providing source map support.


### Stacker.nodeInternals()

Returns an array of regular expressions that be used to cull lines from the stack trace that reference common Node.js internal files.


### Stacker.clean(stack, indent = 0)

Cleans up a stack trace by deleting any lines that match the `internals` passed to the constructor, and shortening file names relative to `cwd`.

Returns a `string` with the cleaned up stack (always terminated with a `\n` newline character).
Spaces at the start of each line are trimmed, indentation can be added by setting `indent` to the desired number of spaces.

#### stack

*Required*  
Type: `string` or an `array` of `string`s


### Stacker.capture([limit], [startStackFunction])

Captures the current stack trace, returning an array of `CallSite`s. There are good overviews of the available CallSite methods [here](https://github.com/v8/v8/wiki/Stack%20Trace%20API#customizing-stack-traces), and [here](https://github.com/sindresorhus/callsites#api).

#### limit

Type: `number`
Default: `Infinity`

Limits the number of lines returned by dropping all lines in excess of the limit. This removes lines from the stack trace.

#### startStackFunction

Type: `function`

The function where the stack trace should start. The first line of the stack trace will be the function that called `startStackFunction`. This removes lines from the end of the stack trace.


### Stacker.captureString([limit], [startStackFunction])

Captures the current stack trace, cleans it using `Stacker.clean(stack)`, and returns a string with the cleaned stack trace. It takes the same arguments as `Stacker.capture`.


### Stacker.at([startStackFunction])

Captures the first line of the stack trace (or the first line after `startStackFunction` if supplied), and returns a `CallSite` like object that is serialization friendly (properties are actual values instead of getter functions). 

The available properties are:

 - `line`: `number` 
 - `column`: `number`
 - `file`: `string`
 - `constructor`: `boolean`
 - `evalOrigin`: `string`
 - `native`: `boolean`
 - `type`: `string`
 - `function`: `string`
 - `method`: `string`

### Stacker.parseLine(line)

Parses a `string` (which should be a single line from a stack trace), and generates an object with the following properties:

 - `line`: `number` 
 - `column`: `number`
 - `file`: `string`
 - `constructor`: `boolean`
 - `evalOrigin`: `string`
 - `evalLine`: `number`
 - `evalColumn`: `number`
 - `evalFile`: `string`
 - `native`: `boolean`
 - `function`: `string`
 - `method`: `string`

## License
MIT ©2022 [Tyler Thompson](https://github.com/tylerthompson)