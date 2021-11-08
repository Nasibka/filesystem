const sharp = require('sharp');

async function resizePhotos(photos){
    for(photo of photos){
        // resizeWebp(photo,320,240,'small',100)
        // resizeWebp(photo,1280,720,'medium',90)
        // resizeWebp(photo,3840,2160,'big',65)

        // resizeJpeg(photo,320,240,'small')
        // resizeJpeg(photo,720,576,'medium')
        // resizeJpeg(photo,3840,2160,'big')


        newResizeWebp(photo,  320,'small', 80)
        newResizeWebp(photo,  640,'medium', 80)
        newResizeWebp(photo, 900,'big',80)

        newResizeJpeg(photo, 320,'small', 80)
        newResizeJpeg(photo,  640,'medium', 80)
        newResizeJpeg(photo,  900,'big', 80)

    }
}

function resizeJpeg(name, width, height, size) {    
    sharp(`${__dirname}/../images/${name}`,{ failOnError: false })
      .toFormat('jpeg')
      .withMetadata()
      .resize(width,height)
      .toFile(`${__dirname}/../images/${size}_${name}`)
      .then( data => {})
      .catch( err => { 
          console.log(err)
      });
}

function resizeWebp(name, width, height, size,quality) {  
    let hash = photo.split('.')[0]  
    sharp(`${__dirname}/../images/${name}`,{ failOnError: false })
        .rotate()
        .webp({ quality: quality })
        .resize(width,height)
        .toFile(`${__dirname}/../images/${size}_${hash}.webp`)
        .then( data => {})
        .catch( err => { 
            console.log(err)
        });

}

function newResizeJpeg(name, biggerSideSizeInPx, size, quality) {
    let hash = name.split('.')[0]
    let format = name.split('.')[1]
    const image =  sharp(`${__dirname}/../images/${name}`,{ failOnError: false })
    image.metadata()
        .then(meta => {
            const resizeOptions = {
                progressive: true
            }
            if (meta.width > meta.height) {
                resizeOptions.width = biggerSideSizeInPx + 300
            } else {
                resizeOptions.height = biggerSideSizeInPx
            }

            return image
                .withMetadata()
                .jpeg({ quality })
                .resize(resizeOptions)
                .rotate()
                .toFile(`${__dirname}/../images/${size}_${hash}.${format}`)
                .then( data => {
                    console.log(data)
                })
                .catch( err => {
                    console.log(err)
                });
        })
        .catch( err => {
            console.log(err)
        });
}

function newResizeWebp(name, biggerSideSizeInPx, size, quality) {
    let hash = name.split('.')[0]

    const image =  sharp(`${__dirname}/../images/${name}`,{ failOnError: false })
    image.metadata()
        .then(meta => {
            const resizeOptions = {
                progressive: true
            }
            if (meta.width > meta.height) {
                resizeOptions.width = biggerSideSizeInPx + 300
            } else {
                resizeOptions.height = biggerSideSizeInPx
            }

            return image
                .webp({ quality: quality })
                .resize(resizeOptions)
                .rotate()
                .toFile(`${__dirname}/../images/${size}_${hash}.webp`)
                .then( data => {
                    console.log(data)
                })
                .catch( err => {
                    console.log(err)
                });
        })
        .catch( err => {
            console.log(err)
        });
}

// function resizeWebp(folderPath,name, width, height, size,quality) {  
//     let hash = photo.split('.')[0]  
//     sharp(`${__dirname}/../images/${folderPath}/${name}`,{ failOnError: false })
//         .rotate()
//         .webp({ quality: quality })
//         .resize(width,height)
//         .toFile(`${__dirname}/../images/${folderPath}/${size}_${hash}.webp`)
//         .then( data => {})
//         .catch( err => { 
//             console.log(err)
//         });
// }
module.exports = {resizePhotos:resizePhotos}