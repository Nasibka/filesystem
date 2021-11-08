const dev = process.env.NODE_ENV == "dev";

const mongoose = require('mongoose');
const config = require('config');
let db = config.get('dev.db')

module.exports = function() {

//developer mode or production?
if (dev) {
  db = config.get('dev.db');
} else {
  db = config.get('prod.db');
}
// ,{ useNewUrlParser: true }
    mongoose.connect(db)
        .then(() => console.log(`Connected to ${db}...`));
}
