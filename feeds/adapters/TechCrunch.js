var q = require('q');
var cheerio = require('cheerio');

var TechCrunch = function(){
    this.endpoint = "http://feeds.feedburner.com/TechCrunch?format=xml";
}

TechCrunch.prototype.parseData = function(xml, q){
    var deferred    = q.defer(),
        dataLength  = xml.rss.channel[0].item.length,
        data        = [];
    
    for(var i = 0; i < dataLength; i++){
        var post    = {};

        post.url    = xml.rss.channel[0].item[i]['feedburner:origLink'][0];
        post.title  = xml.rss.channel[0].item[i].title[0];
        post.score  = parseInt(xml.rss.channel[0].item[i]['slash:comments'][0]);
        post.source = "slashdot";

        console.log(post)
        data.push(post);
    }

    deferred.resolve(data);
    
    return deferred.promise;
}

module.exports = TechCrunch;