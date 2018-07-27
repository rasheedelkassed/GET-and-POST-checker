var express = require("express");

var app = express();
var handlebars = require("express-handlebars").create({ defaultLayout: "main" });

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", 8074);

app.get("/get", function (req, res) {
    var postParams = [];
    for (var p in req.query) {
        postParams.push({ "name": p, "value": req.query[p] });
    }
    var context = {};
    context.datalist = postParams;
    res.render("post", context);

});

app.use(function (req, res) {
    res.status(404);
    res.render('404');
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function () {
    console.log('Express started on http://flip3.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});