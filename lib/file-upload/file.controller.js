const multer = require('multer');
const express = require('express');
const router = express.Router();
const fileService = require('./file.service');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname + '-' + Date.now());
    }
})

const upload = multer({ storage: storage });

function uploadFile(req, res, next) {
    fileService.uploadNewPhoto(req.file).then(uploadResult => uploadResult ? res.json(uploadResult) : res.sendStatus(404)).catch(err => next(err));
}

function findFileById(req, res, next) {
    fileService.findPhotoById(req.params.id).then(result => {
        res.contentType('image/*');
        res.send(result.image);
    }).catch(err => next(err));
}

function findAllFiles(req, res, next) {
    fileService.findAllPhotos().then(result => result ? res.json(result) : res.sendStatus(404).catch(err => next(err)));
}

router.post('/uploadfile', upload.single('picture'), uploadFile);
router.get('/:id', findFileById);
router.get('/', findAllFiles);

module.exports = router;
