const githubRoutes = require('./github_routes');

module.exports = function(express) {
  githubRoutes(express);
};