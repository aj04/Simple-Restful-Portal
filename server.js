var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var multer = require('multer');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

//app.get('/', function (req, res) {
//    res.send('hello world');
//});

app.use(express.static(__dirname + '/public'));
/*
var website = [
    { name: "site1" }, { name: "site1" }, { name: "site2" }, { name: "site3" }
]

app.get('/api/website', function (req, res) {
    res.json(website);
})

app.get('/api/website/:id', function (req, res) {
    res.json(website[req.params.id]);
    console.log(website[req.params.id]);
})*/

var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var developers = [
    {firstName: "Alice", lastName: "Wonderland"},
    {firstName: "Rahul", lastName: "Gupta"},
    {firstName: "Prince", lastName: "Jaiswal"},
    {firstName: "Pranjal", lastName: "Khera"}
];

app.get('/api/developers', function (req, res) {
    res.json(developers);
})

app.delete("/api/developers/:id", function (req, res) {
    var index = req.params.id;
   // console.log(res.params);
   // console.log(index);
    developers.splice(index, 1);
    res.json(developers);
});

app.post("/api/developer", function (req, res) { //add developer
    var obj = req.body; //{ firstName: "First", lastName: "Last" };
    console.log("developer " + obj);
    developers.push(obj);
    console.log("from server " + developers);
    res.json(developers);
});

app.put("/api/developers/:id", function (req, res) {  //modify developer
    var index = req.params.id;
    var obj = req.body;
    developers[index] = obj;
    res.json(developers);
});

app.get("/api/developers/:index", function (req, res) {
    var idx = req.params.index; //req.params['index'];
    res.json(developers[idx])
});

app.get("/api/developers", function (req, res) {
    //var idx = req.params.index; //req.params['index'];
    res.json(developers)
});


//app.listen(3000);

app.listen(port,ip);