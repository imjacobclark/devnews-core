var assert 	= require("assert"),
	Feeds	= require("../../feeds/Feeds");

describe('Feeds', function(){
	describe('.getData()', function(){
		it('should return an object when a valid endpoint is passed', function(){
			var feeds = new Feeds();
			assert.equal("object", typeof feeds.getData("https://www.reddit.com/r/programming/hot.json?limit=10"));
		});
	});

	describe('.parseRedditData()', function(){
		it('should return an object when invoked', function(){
			var feeds = new Feeds();
			
			feeds.parseRedditData().then(function(data){
				assert.equal("array", typeof data);
				assert.equal("object", typeof data[0]);
			});
		});
	});
});