var assert 		= require("assert"),
	q 			= require('q'),
	HackerNews	= require("../../../feeds/sources/HackerNews");

describe('Source HackerNews', function(){
	describe('.endpointItems', function(){
		it('should return a valid string', function(){
			var hackernews = new HackerNews();
			assert.equal("string", typeof hackernews.endpointItems);
		});
	});

	describe('.endpointItem', function(){
		it('should return a valid string', function(){
			var hackernews = new HackerNews();
			assert.equal("string", typeof hackernews.endpointItem);
		});
	});

	describe('.getTopItems', function(){
		it('should return an array of 25 integers when invoked', function(){
			var hackernews = new HackerNews();

			data = [ 9052560, 9052129, 9052168, 9052727, 9052448, 9052809, 9052160, 9052173, 9052187, 9050970, 9052188, 9052128, 9052287, 9052163, 9052147, 9051645, 9052164, 9052336, 9050793, 9051782, 9051246, 9052645, 9050436, 9052478, 9050480, 9050666, 9051591, 9051562, 9052152, 9050646, 9052206, 9051804, 9050332, 9050597, 9050379, 9052774, 9052538, 9051373, 9049569, 9050601, 9052700, 9052395, 9049597, 9049945, 9052318, 9049907, 9049348, 9051288, 9052445, 9050316, 9048772, 9049467, 9049317, 9049208, 9049630, 9050468, 9050009, 9050595, 9050008, 9049113, 9050372, 9044805, 9046526, 9052012, 9049289, 9049917, 9049186, 9050452, 9042282, 9049737, 9051189, 9052286, 9044719, 9049200, 9052392, 9049698, 9046829, 9049690, 9049233, 9040090, 9052409, 9050343, 9048414, 9047086, 9049844, 9051749, 9044927, 9051271, 9049874, 9045125, 9047786, 9045921, 9051540, 9044330, 9047833, 9047255, 9042891, 9049972, 9040841, 9049781 ];

			hackernews.getTopItems(data, q).then(function(data){
				assert.equal("array", typeof data);
				assert.equal(data.length, 25);
				assert.equal("integer", typeof data[0]);
			});
		});
	});
})