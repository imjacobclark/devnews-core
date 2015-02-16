var HackerNews = function(){
    this.endpointItems = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";
    this.endpointItem  = "https://hacker-news.firebaseio.com/v0/item/9054503.json?print=pretty";
}

HackerNews.prototype.getTopItems = function(items, q){
    var deferred    = q.defer()
        data        = [];

    for(var i = 0; i <= 25; i++){
        data.push(items[i]);
    }

    deferred.resolve(data);
    
    return deferred.promise;
}

HackerNews.prototype.getItems = function(getData){

}

module.exports = HackerNews;