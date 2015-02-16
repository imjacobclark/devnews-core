var http 	= require('http'),
	q		= require('q'),
	Feeds	= require('../feeds/Feeds'),
	feeds 	= new Feeds();

var serveData = http.createServer(function (req, res) {
	feeds.getTopNews().then(function(data){
		res.writeHead(200, {'Content-Type': 'application/json'});
		res.end(JSON.stringify(data));	
	}).fail(function(){
		res.writeHead(200, {'Content-Type': 'application/json'});
		res.end("{status:  false}");
	});	
}).listen(1337, '0.0.0.0');