var assert 	= require("assert"),
	q		= require("q"),
	https	= require("https"),
	Reddit	= require("../../feeds/Reddit");

describe('Reddit', function(){
	describe('.init()', function(){
		it('should a JSON strucutre when invoked', function(){
			var reddit = new Reddit();

			reddit.init(q, https).then(function(response){
				assert.equal("object", typeof response);
			});
			
		})
	})
})