var Reddit = function(){
    this.endpoint = "https://www.reddit.com/r/programming/hot.json?limit=10";
}

Reddit.prototype.parseData = function(json, q){
    var deferred    = q.defer(),
        dataLength  = json.data.children.length,
        data        = [];

    for(var i = 0; i < dataLength; i++){
        var post    = {};

        post.url    = json.data.children[i].data.url;
        post.title  = json.data.children[i].data.title;
        post.score  = json.data.children[i].data.score;
        post.source = "reddit";

        data.push(post);
    }

    deferred.resolve(data);
    
    return deferred.promise;
}

module.exports = Reddit;