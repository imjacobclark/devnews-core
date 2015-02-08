var Reddit = function(){
    this.endpoint = "https://www.reddit.com/r/programming/hot.json?limit=10";
}

Reddit.prototype.init = function(q, https){
    var deferred = q.defer();

    https.get(this.endpoint, function(res) {
        var body = '';

        res.on('data', function(chunk) {
            body += chunk;
        });

        res.on('end', function() {
           deferred.resolve(JSON.parse(body));
        });
    }).on('error', function(e) {
        deferred.reject(e);
    });

    return deferred.promise;
}

module.exports = Reddit;