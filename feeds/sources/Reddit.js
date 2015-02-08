var Reddit = function(){
    this.endpoint = "https://www.reddit.com/r/programming/hot.json?limit=10";
}

Reddit.prototype.getURLs = function(json){
    // stubbed
    return json.data.children[0].data.url;
}

module.exports = Reddit;