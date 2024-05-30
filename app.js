const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("../Major project/models/listing.js");
const path = require("path");
const methodOverride = require("method-override")

const MONGO_URL = ('mongodb://127.0.0.1:27017/Wanderlust');

main().then(() => {
    console.log("Database is connected");
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
};

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));


app.get("/", (req, res) => {
    res.send("Root is listening");
});

// Index route
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", { allListings });
});

// New route 
app.post("/listings/new", (req, res) => {
    res.render("./listings/new.ejs");
});

// Show route
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/show.ejs", { listing })
})

// Create route
app.post("/listings", async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});

// Edit route

app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/edit.ejs", { listing });
});

// Update route

app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
});

// Delete route
app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
});

// app.get("/testListing", async (req, res) => {
//     let sampleListing = new Listing({
//         title: "My new villa",
//         description: "By the beach",
//         price: 9555,
//         location: "Callingute , Goa",
//         country: "india",
//     });
//     await sampleListing.save();
//     console.log("Sample was saved");
//     res.send("listing is created");
// });



app.listen(8080, () => {
    console.log("listening to the port 8080");
})