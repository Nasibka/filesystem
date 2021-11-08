const upload = require("../middleware/upload");
const {resizePhotos} = require("../controllers/resizePhotos")

const uploadPhotos = async (req, res) => {
    try {
        // const { buffer, originalname } = req.files;
        await upload(req, res);

        let photo_names = []
        for(file of req.files){
            photo_names.push(file.filename)
        }

        if(req.files.length!=0) {
            res.status(200).send({photo_names:photo_names})
            resizePhotos(photo_names)
        }else{
            res.status(400).send({message:'Вы не прикрепили фотографии'})
        }
    } catch (error) {
        res.status(400).send(`Error when trying upload files: ${error}`);
    }
};

module.exports = {
    uploadPhotos: uploadPhotos,
  };