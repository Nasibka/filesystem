const sharp = require('sharp');

resizePhotos(['kek.JPG'])
async function resizePhotos(photos){
    for(photo of photos){
        resizeWebp(photo,320,240,'small',100)
        resizeWebp(photo,1280,720,'medium',90)
        resizeWebp(photo,3840,2160,'big',65)

        resizeJpeg(photo,320,240,'small')
        resizeJpeg(photo,720,576,'medium')
        resizeJpeg(photo,3840,2160,'big')
    }
}

function resizeJpeg(name, width, height, size) {    
    sharp(`${__dirname}/${name}`,{ failOnError: false })
      .toFormat('jpeg')
      .withMetadata()
      .resize(width,height)
      .toFile(`${__dirname}/images/${size}_${name}`)
      .then( data => {})
      .catch( err => { 
          console.log(err)
      });
}

function resizeWebp(name, width, height, size,quality) {  
    let hash = photo.split('.')[0]  
    sharp(`${__dirname}/${name}`,{ failOnError: false })
        .rotate()
        .webp({ quality: quality })
        .resize(width,height)
        .toFile(`${__dirname}/images/${size}_${hash}.webp`)
        .then( data => {})
        .catch( err => { 
            console.log(err)
        });
}

