const path = require('path');
const fs = require('fs');
const genFileName = (fileName) => {
    let modiName = new Date().valueOf() + "_" + fileName;
    modiName = modiName.replace(/\s/g, "_");
    return modiName;
}
const getSavePath = (fileName) =>  path.join(__dirname, "../public/images"+ "/" + fileName);

const getImagePath = (fileName) => process.env.IMG_PATH + "/" + fileName;
const saveSingleFile = async (req, res, next) => {
    try {

        if (!req.files || !req.files.file) {
            return res.status(400).json({
                con: false,
                msg: "No file uploaded"
            });
        }

        const file = req.files.file;

        let fileName = genFileName(file.name);

        let filePath = getSavePath(fileName);

        await file.mv(filePath);

        // ✅ IMPORTANT
        req.body.image = getImagePath(fileName);

        next();

    } catch (err) {
        next(err);
    }
}

const saveMultipleFiles = async (req , res , next) => {
    try {
        if (!req.files || !req.files.files) {
            return res.status(400).json({
                con: false,
                msg: "No files uploaded. Use the field name 'files'."
            });
        }

        const files = Array.isArray(req.files.files) ? req.files.files : [req.files.files];
        let imgLinks = [];

        for(let i = 0 ; i < files.length ; i++){
            let file = files[i];
            let fileName = genFileName(file.name);
            let filePath = getSavePath(fileName);
            await file.mv(filePath);
            imgLinks.push({link: getImagePath(fileName) , desc : "Image"+i});
        }

        req.imgLinks = imgLinks;
        next();
    } catch (err) {
        next(err);
    }
}

const deleteImageByName = (fileName) => {
    let filePath = getSavePath(fileName);
    if(fs.existsSync(filePath)){
        fs.unlinkSync(filePath);
        return true;
    }
    return false;
}
const deleteImageByLink = (imgLink) => {
    let fileName = imgLink.split("/").pop();
    return deleteImageByName(fileName);
}
module.exports = {
    saveSingleFile , saveMultipleFiles, deleteImageByName, deleteImageByLink
}
