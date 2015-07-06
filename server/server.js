var http    = require('http'),
    q       = require('q'),
    Feeds   = require('../feeds/Feeds'),
    feeds   = new Feeds();

function warmCache(){
    feeds.setCachedNews().then(function(data){
        if(data == true)
            serve();
    });
}

function serve(){
    http.createServer(function (req, res) {
        res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
        
        var data = JSON.stringify(feeds.getCachedNews());
        
        if(data == undefined){
            warmCache();
            res.end(JSON.stringify(feeds.getCachedNews())); 
        }else{
            res.end(JSON.stringify(feeds.getCachedNews()));
        }
    }).listen(process.env.PORT || 1337, '0.0.0.0');
};

warmCache();
