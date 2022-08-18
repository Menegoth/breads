// require mongoose
const mongoose = require("mongoose");
//schema constructor
const { Schema } = mongoose;

//schema
const breadSchema = new Schema ({
    name: { type: String, required: true },
    hasGluten: Boolean,
    image: { type: String, default: "http://placekitten.com/500/500" }
});

//model and export
const Bread = mongoose.model("Bread", breadSchema);
module.exports = Bread;