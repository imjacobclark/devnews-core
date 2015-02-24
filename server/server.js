var http    = require('http');
var NodeCache      = require( "node-cache" );
var cache          = new NodeCache({ stdTTL: 600, checkperiod: 601  });

NodeCache.prototype.context = this; // set a content property of this for use in the EventEmitter callback below

function setCache(){
     return cache.set("data", {"some": "data"});
}

function getCache(){
     return cache.get("data");
}

cache.on("expired", function(){
    this.context.setCache();
});

if(setCache() == true)
        serve();

function serve(){
    http.createServer(function (req, res) {
        res.end(JSON.stringify(getCache())); 
    }).listen(process.env.PORT || 1337, '0.0.0.0');
};