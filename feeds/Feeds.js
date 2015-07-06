var https          = require('https'),
    http           = require('http'),
    q              = require('q'),
    NodeCache      = require( "node-cache" ),
    parseString    = require('xml2js').parseString;
    cache          = new NodeCache({ stdTTL: 600, checkperiod: 601 }),
    Reddit         = require('./adapters/Reddit'),
    HackerNews     = require('./adapters/HackerNews'),
    SlashDot       = require('./adapters/SlashDot');

var Feeds = function(){
    this.reddit        = new Reddit();
    this.hackernews    = new HackerNews();
    this.slashdot      = new SlashDot();
    NodeCache.prototype.feeds = this;
}

Feeds.prototype.init = function(){
}

Feeds.prototype.getXMLData = function(endpoint){
    var deferred = q.defer();

    http.get(endpoint, function(res) {
        var body = '';

        res.on('data', function(chunk) {
            body += chunk;
        });

        res.on('end', function() {
            parseString(body, function (err, result) {
                deferred.resolve(result);
            });
        });
    }).on('error', function(e) {
        deferred.reject(e);
    });

    return deferred.promise;
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

Feeds.prototype.getSlashDotData = function(limit){
    return this.getXMLData(this.slashdot.endpoint).then(function(data){
        return this.slashdot.parseData(data, q);
    }.bind(this), function(err){
        console.log(err);
    });
}

Feeds.prototype.getRedditData = function(limit){
    return this.getData(this.reddit.endpoint).then(function(data){
        return this.reddit.parseData(data, q);
    }.bind(this), function(err){
        console.log(err);
    });
}

Feeds.prototype.getHackerNewsData = function(limit){
    return this.getData(this.hackernews.endpointItems).then(function(data){
        return this.hackernews.getTopItems(data, q).then(function(data){
            return this.hackernews.getItems(this.getData, data).then(function(data){
                return this.hackernews.parseData(data, q);
            }.bind(this));
        }.bind(this));
    }.bind(this), function(err){
        console.log(err);
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
    return q.all([this.getRedditData(), this.getHackerNewsData(), this.getSlashDotData()]).then(function(result){
        return this.sortDataByScore(result[0].concat(result[1]).concat(result[2])).then(function(data){
            return data;
        }.bind(this));
    }.bind(this)); 
}

Feeds.prototype.setCachedNews = function(){
    return this.getTopNews().then(function(data){
        return cache.set("data", data);
    });
}

Feeds.prototype.getCachedNews = function(){
    return cache.get("data").data;
}

cache.on("expired", function(self){
    this.feeds.setCachedNews();
});

module.exports = Feeds;
