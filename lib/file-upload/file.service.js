const fs = require('fs');
const db = require('../shared/dataSource');
const File = db.File;
const path = require('path');

async function findAllPhotos() {
    return await File.find();
}

async function findPhotoById(id) {
    return await File.findById(id);
}

function uploadNewPhoto(newPhoto) {
    const newPhotoPath = path.normalize(newPhoto.path);
    const imageSrc = fs.readFileSync(newPhotoPath);
    
    const imageObject = {
        contentType: newPhoto.mimetype || 'image/png',
        fileName: newPhoto.originalname || "user-male",
        image: imageSrc
    };

    const fileModel = new File(imageObject);
    return fileModel.save().then(data => {
        let uploadId = { uploadId: data._id, image: data.image };
        return uploadId
    }).catch(err => {
        throw err;
    })
}

module.exports = {
    uploadNewPhoto,
    findPhotoById,
    findAllPhotos
};