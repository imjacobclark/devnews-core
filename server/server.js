var http    = require('http'),
    cluster = require('cluster'),
    numCPUs = require('os').cpus().length,
    q       = require('q'),
    Feeds   = require('../feeds/Feeds'),
    feeds   = new Feeds();

function warmCache(){
    feeds.setCachedNews().then(function(data){
        if(data) serve();
    });
}

function serve(){
    http.createServer(function (req, res){
        res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});

        var data = JSON.stringify(feeds.getCachedNews());

        if(data === undefined || data === 'undefined' ){
            warmCache();
            res.end(JSON.stringify(feeds.getCachedNews()));
        }else{
            res.end(data);
        }
    }).listen(process.env.PORT || 3000, '0.0.0.0');
};

if (cluster.isMaster) {
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', function(worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
    });

    cluster.on('online', function(worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' successfully started.');
    });
} else {
    warmCache();
}
