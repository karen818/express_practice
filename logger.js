module.exports = function(req, res, next){
    var start = +new Date();
    var stream = process.stdout;
    var url = req.url;
    var method = req.method;


    //the response object is an EventEmitter which we can use to listen to events
    //event handler function runs asynchronously
    //the finish event is emitted when the response has been handed off to the OS
    res.on('finish', function(){
        var duration = +new Date() - start;
        //the log message
        var message = method + ' to ' + url +
            ' \ntook' + duration + ' ms \n\n';

        stream.write(message); //prints the log message to the console
    });

    next();
}
