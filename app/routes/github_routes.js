const rp = require('request-promise');
const Q = require('q');
const https = require('https');

module.exports = function(app) {

  getFollowers = (user, maxDepth = 3, depth = 0) => {
    const deferred = Promise.defer();

    const options = {
      url: 'https://api.github.com/users/' + user.login + '/followers',
      headers: {
        'User-Agent': 'request',
        // This is a read only bearer token to increase the github api call limit so this can be used more than twice,
        // NOTE not a good long term idea.
        'Authorization': 'Bearer e47b56f66c198062f770c6cfe0bc745611e2aad5'
      }
    };

    rp(options).then((data) => {
      followers = JSON.parse(data);
      if (followers.length > 0 && depth < maxDepth) {
        reduced = followers.splice(0,3).map(follower => {return{login: follower.login}});

        user.followers = reduced;

        promises = [];

        reduced.forEach(follower => {
          promises.push(getFollowers(follower, maxDepth, depth + 1))
        });

        Q.all(promises).then(() => {deferred.resolve()})
      } else {
        deferred.resolve();
      }
    });

    return deferred.promise;
  };

  app.get('/users/:userId/followers', (req, res) => {
    ret = {'login': req.params.userId};

    getFollowers(ret).then(() => {
      res.send(ret);
    });
  });
};