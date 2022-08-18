//DEPENDENCIES
const express = require("express");
const breads = express.Router();
const Bread = require("../models/bread.js");
const breadsTest = require("../models/breads-test-data.js");

//INDEX
breads.get("/", (req, res) => {
    Bread.find()
        .then(foundBreads => {
            res.render("Index", {
                breads: foundBreads,
                title: "Index Page"
            }
        );
    });
});

//SEED
breads.get("/data/seed", (req, res) => {
    Bread.insertMany(breadsTest)
        .then(createdBreads => {
            res.redirect("/breads")
        })
})

// NEW
breads.get("/new", (req, res) => {
    res.status(303).render("new");
})

//DELETE
breads.delete("/:id", (req, res) => {
    Bread.findOneAndDelete(req.params.id)
        .then(deletedBread => {
            console.log(deletedBread);
            res.status(302).redirect("/breads");
        })
})

//UPDATE
breads.put("/:id", (req, res) => {
    if (req.body.hasGluten === "on") {
        req.body.hasGluten = true;
    } else {
        req.body.hasGluten = false;
    }
    Bread.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(updatedBread => {
            console.log(updatedBread);
            res.status(302).redirect(`/breads/${req.params.id}`);
        })
})

//EDIT
breads.get("/:id/edit", (req, res) => {
    Bread.findById(req.params.id)
        .then(foundBread => {
            res.status(303).render("edit", {
                bread: foundBread
            })
        })
})

//SHOW
breads.get("/:id", (req, res) => {
    Bread.findById(req.params.id)
        .then(foundBread => {
            res.render("show", { bread: foundBread });
        })
        .catch(err => {
            res.status(404).render("error404");
        })
});

// CREATE
breads.post('/', (req, res) => {
    if (!req.body.image) {
      req.body.image = undefined;
    }
    if(req.body.hasGluten === 'on') {
      req.body.hasGluten = true
    } else {
      req.body.hasGluten = false
    }
    Bread.create(req.body)
    res.redirect('/breads')
})
  

//export
module.exports = breads;