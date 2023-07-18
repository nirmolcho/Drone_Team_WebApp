const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage").GridFsStorage;
console.log(process.env.MONGODB_URI)
const storage = new GridFsStorage({
    url: process.env.MONGODB_URI,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpeg"];

        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-product-${file.originalname}`;
            return filename;
        }

        return {
            bucketName: "pictures",
            filename: `${Date.now()}-product-${file.originalname}`,
        };
    },
});

module.exports = multer({ storage });