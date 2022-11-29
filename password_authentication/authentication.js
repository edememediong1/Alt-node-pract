const fs = require("fs")
const path = require("path")
const userDbPath = path.join(__dirname, "db", "users.json")

function getAllUsers(req , res){
    return new Promise ((resolve, reject) => {
        fs.readFile(userDbPath, "utf8", (err, users)=>{
            if(err){
                reject(err)
            }resolve(JSON.parse(users)) 
        })
    })

}

function authenticate(req, res){
    return new Promise ((resolve, reject) => {
        // Do authentication here

        const body = []

        req.on("data",(chunk) => {
            body.push(chunk)
        })
        req.on("end", async () => {
            const parsedBody = Buffer.concat(body).toString()
            // console.log(parsedBody)

            if(!parsedBody){
                reject("No username")
            }

            loginDetails = JSON.parse(parsedBody)
            // console.log(loginDetails)
            
            const users = await getAllUsers()
            // console.log(users)
            const userFound = users.find((user)=>{
                return user.username === loginDetails.username
            })
            // console.log(userFound)John42

            if(!userFound){
                reject("User not found")
            }

            if (userFound.password !== loginDetails.password){
                reject("Password not found")
            }
            resolve()
                
            
        })
    })
}


module.exports = {
    authenticate
}

