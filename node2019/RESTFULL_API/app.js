const http = require('http');

const server = http.createServer((req, res) => {
    // res.writeHead(200, {
    //     "Content-Type": 'text/plain'
    // });
    // res.write("HELLO World");
    // res.end();

    if(req.url === '/') {
        res.write("Hello World");
        res.end();
    }
    if(req.url === '/api/courses') {
        res.write(JSON.stringify([1,2,3]));
        res.end();
    }
});

server.listen(3000);
console.log("listening on port 3000...")