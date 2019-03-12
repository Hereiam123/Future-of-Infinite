global.fetch = require("node-fetch");
const config = require("universal-config");
const Unsplash = require("unsplash-js").default;
const toJson = require("unsplash-js").toJson;
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({
  path: "./.env"
});

const unsplash = new Unsplash({
  applicationId: config.get("APPLICATION_ID"),
  secret: config.get("SECRET"),
  callbackUrl: config.get("CALLBACK_URL")
});

const app = express();

app.use(express.static("/client/build"));

app.get("/api/photos", (req, res) => {
  unsplash.photos
    .listPhotos(req.query.start, req.query.count)
    .then(toJson)
    .then(json => res.json(json));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));
