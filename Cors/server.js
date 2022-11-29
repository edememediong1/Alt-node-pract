const http = require("http");

const hostname = 'localhost';
const port = 8000;

const requestListener = function (req, res) {
    //Configure CORS
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    res.writeHead(200); // Status code 200 = OK
    res.write(JSON.stringify({ message: "Hello There" }));
    res.end();
};



// Create the server
const server = http.createServer(requestListener)
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})