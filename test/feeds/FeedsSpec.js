var assert 	= require("assert"),
	q 			= require('q'),
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
			
			feeds.getRedditData().then(function(data){
				assert.equal("array", typeof data);
				assert.equal("object", typeof data[0]);
			});
		});
	});

	describe('.sortDataByScore()', function(){
		it('should return a high->low ordered array of objects by the score property', function(){
			var feeds = new Feeds();
			var data  = [{"url":"http://flafla2.github.io/2015/02/14/bunnyhop.html","title":"Bunnyhopping from the Programmer\'s Perspective - An in depth look in implementing one of the most successful bugs in videogame history.","score":910,"source":"reddit"},{"url":"https://github.com/ckkashyap/rustix/issues/8","title":"Author of \"Unix in Rust\" abandons Rust in favour of Nim","score":315,"source":"reddit"},{"url":"https://neosmart.net/blog/2015/using-hmac-signatures-to-avoid-database-writes/","title":"Life in a post-DB world: Using crypto to avoid database writes","score":198,"source":"reddit"},{"url":"http://websocketd.com/","title":"WebSockets Unix Daemon - Full duplex messaging between web browsers and servers","score":430,"source":"reddit"}]

			feeds.sortDataByScore(data).then(function(data){
				assert.equal(data[0].title, "Bunnyhopping from the Programmer\'s Perspective - An in depth look in implementing one of the most successful bugs in videogame history.");
				assert.equal(data[1].title, "Author of \"Unix in Rust\" abandons Rust in favour of Nim");
				assert.equal(data[2].title, "Life in a post-DB world: Using crypto to avoid database writes");
			});
		});
	});

	describe('.getTopNews()', function(){
		xit('should accept promises for arrays of JSON, merge them and sort them accordingly', function(){
			// stubbed
		});
	});
});