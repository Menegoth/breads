//DEPENDENCIES
const express = require("express");
const breads = express.Router();
const Bread = require("../models/bread.js");
const breadsTest = require("../models/breads-test-data.js");
const Baker = require("../models/baker.js");

//INDEX
breads.get("/", (req, res) => {
    Baker.find()
        .then(foundBakers => {
            Bread.find()
            .then(foundBreads => {
                res.render("Index", {
                    breads: foundBreads,
                    bakers: foundBakers,
                    title: "Index Page"
                }
            );
    });
        })
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
    Baker.find()
        .then(foundBakers => {
            res.render("new", {
                bakers: foundBakers
            })
        })
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
    Baker.find()
        .then(foundBakers => {
            Bread.findById(req.params.id)
                .then(foundBread => {
                res.status(303).render("edit", {
                    bread: foundBread,
                    bakers: foundBakers
                })
            })
        })
})

//SHOW
breads.get("/:id", (req, res) => {
    Bread.findById(req.params.id)
        .populate("baker")
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
        .catch(err => {
            console.log("err", err);
            res.redirect('/breads')
        })
    res.redirect('/breads')
})
  

//export
module.exports = breads;