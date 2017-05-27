var express = require("express");
var fs = require("fs");

var app = express();

app.set('view engine', 'jade');

app.use('/static', express.static(__dirname + '/public'));

app.get("/", function (req, res) {
    res.render("index.jade");
});

app.get("/random", function (req, res) {
    fs.readFile('data.json', 'utf8', function (err, data) {
        var obj = JSON.parse(data);

        var objRandom = obj[parseInt(Math.random() * obj.length)];

        res.render("search.jade", {
            yourSearch: objRandom.before[0],
            result: objRandom
        });
    });
});

app.get("/:name", function (req, res) {
    var keyToMatch = req.params.name;

    fs.readFile('data.json', 'utf8', function (err, data) {
        var obj = JSON.parse(data);
        var result = obj.filter(register => {
            return register.before.filter (b => b === keyToMatch).length > 0;
        });
        
        res.render("search.jade", {
            yourSearch: keyToMatch,
            result: (result.length === 0)? {now: []} : result[0]
        });
    });
});

app.listen(process.env.PORT || 5000, function () {
  console.log('Example app listening on port 5000!');
});