global.fetch = require("node-fetch");
const config = require("universal-config");
const {createApi} = require("unsplash-js");
const toJson = require("unsplash-js").toJson;
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({
  path: "./.env",
});

const unsplash = createApi({
  accessKey: config.get("APPLICATION_ID") || process.env.ACCESS_KEY,
  //secret: config.get("SECRET") || process.env.SECRET,
});

const app = express();

app.get("/api/photos", (req, res) => {
  unsplash.photos
    .getPhotos({page: req.query.start, perPage: req.query.count})
    .then(toJson)
    .then((json) => {console.log(json); res.json(json);})
	.error((e)=>{console.log(e)});
});

app.use(express.static(path.join(__dirname + "/client/build/")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));
