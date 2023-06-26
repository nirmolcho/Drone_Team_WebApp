const upload = require("../../../OneDrive/שולחן העבודה/תואר מדעי המחשב/ד. תואר במדעי המחשב - שנה ב - סמסטר ב/א. פיתוח אפליקציות אינטרנטיות/א. פרוייקט/added - admin create product_added validation for frontend and backend_ and added token validation_v4/drone-v4/utils/upload");
const express = require("express");
const router = express.Router();

router.post("/upload", upload.single("file"), async (req, res) => {
    if (req.file === undefined) return res.send("you must select a file.");
    const imgUrl = `http://localhost:5000/file/${req.file.filename}`;
    return res.send(imgUrl);
});

module.exports = router;