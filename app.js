var express = require("express");
var fs = require("fs");

var app = express();

app.get("/:name", function (req, res) {
    var keyToMatch = req.params.name;

    fs.readFile('data.json', 'utf8', function (err, data) {
        var obj = JSON.parse(data);
    });
});