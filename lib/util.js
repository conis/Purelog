
exports.apply = function(fn, args, thisArgs){
  return fn.apply(thisArgs, Array.prototype.slice.call(args, 0));
}

/*
  数据中转
 */
exports.transfer = function(agent, source, methods){
  methods.forEach(function(method){
    agent[method] = function(){
      exports.apply(source[method], arguments);
    };
  });
}