// implement your API here
// import express from "express";


const express = require("express")

const Users = require("./data/db.js");

const server = express();

//middleware: teaches express new things

server.use(express.json()); // needed to parse JSON

//Routes or EndPoints 

// GET "/"

server.get("/", function(request, response) {

    response.send({hello: "Web 25!"});
})

//GET request to see list 

server.get("/api/users", (req, res) => {
    Users.find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ errMessage: "The users information could not be retrieved."})
    })
})

server.get("/api/users/:id", (req, res) => {
    Users.findById()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ errMessage: "The users information could not be retrieved."})
        res.status(404).json({message: "The user with the specified ID does not exist." })
    })
})

//POST request to create a user

server.post("/api/users", (req, res) => {
    const userData = req.body;

    if(!userData.name || !userData.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }
    Users.insert(userData)
    .then(user => {
        res.status(201).json(user)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({errorMessage: "There was an error while saving the user to the database" })
    })
})


// Delete request 
server.delete("/api/users/:id", (req, res) => {
    const id = req.params.id

    Users.remove(id)
    .then( () => {
        res.status(404).json({message: "The user with the specified ID does not exist."})
    })
    .catch(res => {
        res.status(500).json({ errorMessage: "The user could not be removed" })
    })
})


//Put request

server.put("/api/users/:id", (req, res) => {
    const id = req.params.id

    const userData = req.body

    Users.update(id, userData)
    .then(update => {
        res.status(200).json(update)
     })
     .catch(error => {
         res.status(404).json({message: "The user with the specified ID does not exist."})
         res.status(400).json({errorMessage: "Please provide name and bio for the user."})
         res.status(500).json({errorMessage: "The user information could not be modified."})
     })
    
})


    // if (userData.id !== id) {
    //     res.status(404).json({message: "The user with the specified ID does not exist."})
    // } else if (!userData.name || !userData.bio) {
    //     res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    // } else if (err) {
    //     res.status(500).json({errorMessage: "The user information could not be modified."})
    // } else (userData.id === id) {
    //     res.status(200).json(userData.id)
    // }













const port = 8000;

server.listen(port, () => console.log(`\n ** APPI on port: ${port} **`))