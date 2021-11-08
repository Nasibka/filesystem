let dev = process.env.NODE_ENV == "dev";

const util = require("util");
const path = require("path");
const multer = require("multer");
const fs = require('fs');
const sharp = require('sharp');

const crypto = require('crypto');
let imagePath = dev ? path.join(`${__dirname}/../images`) : path.join( `${__dirname}/../images`)


//TODO создать бд с записями о фото и метаданные(бд будет генерить hash) 
//таблица с ассоциациями user_id user_photos
//collection photos with photo_id but, without user_id and collection user_photos with user_id and photo_id
var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, imagePath);
  },
  filename: (req, file, callback) => {
    const match = ["image/png", "image/jpeg", "image/jpg"];

    if (match.indexOf(file.mimetype) === -1) {
        var message = `${file.originalname} is invalid. Only accept png/jpeg/jpg.`;
        return callback(message, null);
    }
    //hash as photo name
    var current_date = (new Date()).valueOf().toString();
    var random = Math.random().toString();
    const hex = crypto.createHash('sha1').update(current_date + random).digest('hex');

    // var filename = `${hex}.webp`;
    var filename = `${hex}.${file.mimetype.split('/')[1]}`;
    
    callback(null, filename);
  }
});

var uploadFiles = multer({ storage: storage }).array("photo", 30);
var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;