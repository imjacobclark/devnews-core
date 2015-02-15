var assert 	= require("assert"),
	q 		= require('q'),
	Reddit	= require("../../../feeds/sources/Reddit");

describe('Source Reddit', function(){
	describe('.endpoint', function(){
		it('should return a valid string', function(){
			var reddit = new Reddit();
			assert.equal("string", typeof reddit.endpoint);
		});
	});

	describe('.parseData', function(){
		it('should return an array of objects when invoked', function(){
			var reddit = new Reddit();

			jsonString = '{ "data": { "children": [{ "data": { "title": "Hello World", 	"url": "http://google.com", "score": 300 } }] } }';

			json = JSON.parse(jsonString);

			reddit.parseData(json, q).then(function(data){
				assert.equal("array", typeof data);
				assert.equal("object", typeof data[0]);
			});
		});
	});
})