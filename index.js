var _storage = require('./lib/storage')
  , _router = require('./lib/router');

var purelog = {
  storage: _storage,
  router: _router
};

exports = module.exports = purelog;