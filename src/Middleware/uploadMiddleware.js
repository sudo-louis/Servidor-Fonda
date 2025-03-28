const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = "src/uploads/";
        if (req.baseUrl.includes("products")) {
        folder += "products/";
        } else if (req.baseUrl.includes("providers")) {
        folder += "providers/";
        }
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Formato no permitido. Solo JPG, PNG y WEBP."));
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;