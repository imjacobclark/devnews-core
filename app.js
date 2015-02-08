var Reddit = require('./feeds/Reddit');

var reddit = new Reddit();

reddit.init(q, https).then(function(response){
	console.log(response.data.children[0].data.title)
})