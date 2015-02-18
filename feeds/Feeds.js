var https          = require('https'),
	q              = require('q'),
	Reddit         = require('./sources/Reddit'),
    HackerNews     = require('./sources/HackerNews');

var Feeds = function(){
	this.reddit        = new Reddit();
    this.hackernews    = new HackerNews();
}

Feeds.prototype.init = function(){
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

Feeds.prototype.getRedditData = function(limit){
	var _this      = this;

	return this.getData(this.reddit.endpoint).then(function(data){
        return _this.reddit.parseData(data, q);
	});
}

Feeds.prototype.getHackerNewsData = function(limit){
    var _this      = this;

    return this.getData(this.hackernews.endpointItems).then(function(data){
        return _this.hackernews.getTopItems(data, q).then(function(data){
            return _this.hackernews.getItems(_this.getData, data).then(function(data){
                return _this.hackernews.parseData(data, q);
            });
        });
    });
}

Feeds.prototype.sortDataByScore = function(data){
    var deferred    = q.defer(),
        swapped;

    do {
        swapped = false;
        for (var i = 0; i < data.length-1; i++) {
            if (data[i].score < data[i+1].score) {
                var temp = data[i];
                data[i] = data[i+1];
                data[i+1] = temp;
                swapped = true;
            }
        }
    } while (swapped);

    deferred.resolve(data.splice(0, 25));
    
    return deferred.promise;
}

Feeds.prototype.getTopNews = function(){
    var _this      = this;

    return q.all([this.getRedditData(), this.getHackerNewsData()]).then(function(result){
        return _this.sortDataByScore(result[0].concat(result[1])).then(function(data){
            return data;
        });
    });

}

module.exports = Feeds;