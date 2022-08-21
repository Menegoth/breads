// dependencies
const express = require('express');
const bakers = express.Router();
const Baker = require('../models/baker.js');
const bakerSeedData = require('../models/baker-seed.js');

bakers.get('/data/seed', (req, res) => {
    Baker.insertMany(bakerSeedData)
        .then(res.redirect('/breads'))
})

bakers.get("/", (req, res) => {
    Baker.find()
        .populate("breads")
        .then(foundBakers => {
            res.send(foundBakers)
        })
})

bakers.get("/:id", (req, res) => {
    Baker.findById(req.params.id)
        .populate("breads")
        .then(foundBaker => {
            res.render("bakerShow", {
                baker: foundBaker
            })
        })
}) 

// export
module.exports = bakers;                    
