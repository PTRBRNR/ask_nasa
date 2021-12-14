const express = require("express");
const path = require("path");

let app = express();

let publicDir = path.join(__dirname, "public");
app.use(express.static(publicDir));

app.listen(8080, function () {
  console.log("Application is running on 8080.");
});
