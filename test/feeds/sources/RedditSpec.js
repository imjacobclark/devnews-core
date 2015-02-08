var assert 	= require("assert"),
	Reddit	= require("../../../feeds/sources/Reddit");

describe('Reddit', function(){
	describe('.endpoint', function(){
		it('should return a valid string', function(){
			var reddit = new Reddit();
			assert.equal("string", typeof reddit.endpoint);
		})
	})
})