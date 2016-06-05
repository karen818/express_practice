var express = require('express');
var app = express();

//In order to store add'l info, use a JS object;
//can now be accessed from other routes in the file
var blocks = {
    'Fixed': 'Fastened securely in position',
    'Movable': 'Capable of being moved',
    'Rotating': 'Moving in a circle around its center'
};

var locations = {
    'Fixed': 'First floor',
    'Movable': 'Second floor',
    'Rotating': 'Penthouse'
};


//the app.param function maps placeholders to callback functions
//useful for running pre-conditions on dynamic routes
app.param('name', function(req, res, next){ //called for routes which include the :name placeholder
    //use req.params.name to look up description
    //returns undefined when no property is found for a given object name
    var name = req.params.name;
    //first char to upper case and remaining chars to lower case
    //supports any url argument case
    var block = name[0].toUpperCase() + name.slice(1).toLowerCase();

    req.blockName = block; //can be accessed from other routes in the application
    next(); //must be called to resume req
});

//require and use logger
// var logger = require('./logger');
// app.use(logger);

app.use(express.static('public'));

// /blocks/:name creates name property on the req.params object -> req.params.name
app.get('/blocks/:name', function(req, res){
    // res.json(Object.keys(blocks)); //returns properties from the blocks object

    var description = blocks[req.blockName];

    if(!description){ //checks for presence of a description to determine the response
        res.status(404).json('No description found for ' + req.params.name);
    }
    else{
        res.json(blocks); //defaults to 200 success status code
    }

    //limits the number of results returned
    if(req.query.limit >= 0){ //true when a numeric value for limit is part of the url
        res.json(blocks.slice(0, req.query.limit)); //returns limited results
    }
    else{
        res.json(blocks); //returns all results
    }
});

app.get('/locations/:name', function(req, res){
    var location = locations[req.blockName];
    if(!location){ //checks for presence of a description to determine the response
        res.status(404).json('No description found for ' + req.params.name);
    }
    else{
        res.json(locations); //defaults to 200 success status code
    }

    //limits the number of results returned
    if(req.query.limit >= 0){ //true when a numeric value for limit is part of the url
        res.json(locations.slice(0, req.query.limit)); //returns limited results
    }
    else{
        res.json(locations); //returns all results
    }
});

app.listen(3000);
