var _path = require('path')
  , _copyFile = require('dank-copyfile')
  , _fs = require('fs');

exports.execute = function(){
  //读取config.samples文件
  var config = 'config.js';

  copyFile(_path.join('..', config), config);
  copyFile(_path.join('..', 'package.sample.json'), 'package.json');
  copyApp();
}

//读取文件
function readFile(file){
  file = _path.join(__dirname, file);
  return _fs.readFileSync(file, 'utf-8');
}

//写入文件
function writeFile(file, content){
  var path = _path.join(_path.resolve(), file);
  _fs.open(path,"w",0644,function(e,fd){
    if(e) throw e;
    _fs.write(fd,content,0,'utf-8',function(e){
      if(e) throw e;
      _fs.closeSync(fd);
    });
  });
}

//复制app文件
function copyApp(){
  var filename = 'app.js';
  var content = readFile(_path.join('..', filename));
  //修改require
  content = content.replace('./index', 'purelog');
  writeFile(filename, content);
}

//复制文件
function copyFile(source, target){
  var source = _path.join(__dirname, source);
  var target = _path.join(_path.resolve(), target);
  _copyFile(source, target);
}