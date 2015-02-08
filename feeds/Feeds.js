var https 	= require('https'),
	q 		= require('q'),
	Reddit	= require('./sources/reddit');

var Feeds = function(){
	this.reddit = new Reddit();
}

Feeds.prototype.getData = function(endpoint){
	var deferred = q.defer();

    https.get(endpoint, function(res) {
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

Feeds.prototype.getRedditURLs = function(){
	// to implement
}

module.exports = Feeds;