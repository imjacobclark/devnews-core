var http 	= require('http'),
	q		= require('q'),
	Feeds	= require('../feeds/Feeds'),
	feeds 	= new Feeds();

feeds.getTopNews().then(function(data){
	var serveData = http.createServer(function (req, res) {
		res.writeHead(200, {'Content-Type': 'application/json'});

		res.end(JSON.stringify(data));
	}).listen(1337, '0.0.0.0');
}).fail(function(){
	res.writeHead(200, {'Content-Type': 'application/json'});

	res.end("{status:  false}");
});	