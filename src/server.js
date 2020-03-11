/*const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname + '/'));

app.get('/*', function(req, res){
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.listen(process.env.PORT || 3000);
*/
const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 8000;
const server = require('http').Server(app);

app.use(express.static(__dirname + "dist/scrume-front", {index: false}));


server.listen(port, function() {
    console.log("App running on port " + port);
})

// PathLocationStrategy

app.get('', function(req, res) {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});