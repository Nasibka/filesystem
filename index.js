let dev = process.env.NODE_ENV == "dev";

const config = require("./config/default");
const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const router = require("./routes/index")

let port;

if (dev) {
    port = config.dev.port;
} else {
    port = config.prod.port;
}

app.use(cors());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "POST, GET, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(
    bodyParser.urlencoded({
        limit: "50mb",
        extended: true,
        parameterLimit: 1000000
    })
);

app.use("/", router);

const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);


