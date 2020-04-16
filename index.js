var express = require('express');

var app = express();

app.use(express.static(__dirname));

app.get('/', function(req, res) {
	res.render('index.html');
});

var port = 3000;
app.listen(port, function() {
	console.log('Server', process.pid, 'listening on port', port);
});
