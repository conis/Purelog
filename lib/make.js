#!/usr/bin/env node

/**
 * Module dependencies.
 */

var _program = require('commander')
  , _fs = require('fs')
  , _purelog = require('../index')
  , _deploy = require('./deploy')
  , _path = require('path');

_program
  .version(JSON.parse(_fs.readFileSync(__dirname + '/../package.json', 'utf8')).version)
  .option('-i, --init', '初始化项目')
  .usage('[debug] [options] [files]')
  .parse(process.argv);

_program.name = 'purelog';

if(_program.init){
  _deploy.execute();
  return;
}

_program.help();
