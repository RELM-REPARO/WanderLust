const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        type: String,
        set: (v) => v === "" ? "https://unsplash.com/photos/a-bright-blue-object-in-the-middle-of-the-night-sky-Yh85OWKlS0w" : v,
    },
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;