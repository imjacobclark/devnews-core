var q = require('q');
var parseString = require('xml2js').parseString;

var SlashDot = function(){
    this.endpoint = "http://rss.slashdot.org/slashdot/slashdotMain?format=xml";
}

SlashDot.prototype.parseData = function(xml, q){
    var deferred    = q.defer(),
        dataLength  = xml['rdf:RDF'].item.length,
        data        = [];
    
    for(var i = 0; i < dataLength; i++){
        var post    = {};

        post.url    = xml['rdf:RDF'].item[i].link[0];
        post.title  = xml['rdf:RDF'].item[i].title[0];
        post.score  = xml['rdf:RDF'].item[i]['slash:comments'][0];
        post.source = "slashdot";

        data.push(post);
    }

    deferred.resolve(data);
    
    return deferred.promise;
}

module.exports = SlashDot;