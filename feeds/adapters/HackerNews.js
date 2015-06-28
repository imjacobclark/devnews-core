var q = require('q');

var HackerNews = function(){
    this.endpointItems = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";
    this.endpointItem  = "https://hacker-news.firebaseio.com/v0/item/{id}.json?print=pretty";
}

HackerNews.prototype.getTopItems = function(items, q){
    var deferred    = q.defer()
        data        = [];

    for(var i = 0; i <= 15; i++){
        data.push(items[i]);
    }

    deferred.resolve(data);
    
    return deferred.promise;
}

HackerNews.prototype.getItems = function(getData, data){
    var _this       = this
    deferred        = q.defer(),
    promises        = [];

    for(var i = 0; i < data.length; i++){
        var endpoint = this.endpointItem.replace(/{id}/, data[i])
        promises.push(getData(endpoint));
    }

    return q.all(promises).then(function(result){
        return result;
    }, function(err){
        console.log(err);
    });    
}

HackerNews.prototype.parseData = function(json, q){
    var deferred    = q.defer(),
        dataLength  = json.length,
        data        = [];

    for(var i = 0; i < dataLength; i++){
        var post    = {};

        post.url    = json[i].url;
        post.title  = json[i].title;
        post.score  = json[i].score;
        post.source = "hackernews";

        data.push(post);
    }

    deferred.resolve(data);
    
    return deferred.promise;
}

module.exports = HackerNews;