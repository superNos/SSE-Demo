var http = require("http");

http.createServer(function(req, res) {
    if(req.url === '/createSse') {
        res.writeHead(200, {
            "Content-Type": "text/event-stream",
            "Cache-Control": 'no-cache',
            "Connection": 'keep-alive',
            "Access-Control-Allow-Origin": '*'
        })
        res.write('retry: 10000\n')
        res.write("event: connecttime\n");
        res.write("data: " + (new Date()) + "\n\n");

        const interval = setInterval(function() {
            res.write("event: test\n");
            res.write("data: " + (new Date()) + "\n\n");
        }, 3000)
        req.connection.addListener("close", function () {
            clearInterval(interval);
        }, false);
    }
}).listen(9988, '127.0.0.1')