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
  console.log('Purelog已经成功初始化，请执行以下操作：');
  console.log('npm install && node app.js');
  console.log('更多配置请访问：http://Purelog.org');
  return;
}

_program.help();
