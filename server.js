global.fetch = require("node-fetch");
const config = require("universal-config");
const Unsplash = require("unsplash-js").default;
const toJson = require("unsplash-js").toJson;
const express = require("express");
const path = require("path");

const unsplash = new Unsplash({
  applicationId: config.get("APPLICATION_ID") || APPLICATION_ID,
  secret: config.get("SECRET") || SECRET,
  callbackUrl: config.get("CALLBACK_URL") || CALLBACK_URL
});

console.log(APPLICATION_ID + "is here?");

const app = express();

app.use(express.static(`${__dirname}/../build`));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
  console.log("Alve!");
});

app.get("/api/photos", (req, res) => {
  unsplash.photos
    .listPhotos(req.query.start, req.query.count)
    .then(toJson)
    .then(json => res.json(json));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));
