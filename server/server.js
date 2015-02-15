var http 	= require('http'),
	q		= require('q'),
	Feeds	= require('../feeds/Feeds');

http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'application/json'});

	var feeds = new Feeds();
	
	feeds.getTopNews().then(function(data){

	});
}).listen(80, '0.0.0.0');