const http = require("http");
const fs = require("fs");
const path = require("path");

const {authenticate} = require("./authentication")
const booksDbPath = path.join(__dirname, "db", "books.json");

const PORT = 4000
const HOST_NAME = "localhost";

const requestHandler = async function(req , res){
    res.setHeader("Content-Type", "application/json");

    if (req.url === "/books" && req.method ==="GET"){
        authenticate(req ,res)
            .then(()=>{
                getAllBooks(req, res);
            }).catch((err) =>{
                res.writeHead(400)
                res.end(JSON.stringify({
                    message: err
                }))
            })
        
    }else if (req.url === "/books" && req.method === "POST"){
        addBook(req, res);
    }else if (req.url === "/books" && req.method ==="PUT"){
        updateBook(req, res);
    }else if (req.url.startsWith("/books") && req.method === "DELETE"){
        deleteBook(req, res);
    }else{
        res.writeHead(404);
        res.end(JSON.stringify({
            message: "Method Not Supported"
        }))
    }

}


function getAllBooks(req, res){
    fs.readFile(booksDbPath, "utf8", (err, data)=>{
        if(err){
            console.log(err)
            res.writeHead(404);
            res.end("Error")
        }res.end(data)
    })

}

const addBook = function(req, res){
    const body = [];

    req.on("data", (chunk) =>{
        body.push(chunk)
    });

    req.on("end", () =>{
        const parsedBody = Buffer.concat(body).toString();
        newBook = JSON.parse(parsedBody); 
        // console.log(newBook)
    })

    const lastBook = booksDB[booksDB.length - 1]
    const lastBookId = lastBook.id;
    newBookId = lastBookId + 1


    fs.writeFile(booksDbPath, JSON.stringify(booksDB), (err) => {
        if (err){
            console.log(err);
            res.writeHead(500);
            res.end(JSON.stringify({
                message: "Internal Server error"
            }))
        }
        booksDB.push(newBook);
        res.end(JSON.stringify(newBook))
    } )
}



// Creating the server 
const server = http.createServer(requestHandler)

server.listen(PORT, HOST_NAME, () => {
    booksDB = JSON.parse(fs.readFileSync(booksDbPath, "utf8"));
    console.log(`Server is listening on ${HOST_NAME}:${PORT}`)
})
