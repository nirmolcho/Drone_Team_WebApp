var express = require('express');
const dotenv = require("dotenv");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
// var helmet = require('helmet');
var colors = require('colors');
dotenv.config();
const mongoose = require('mongoose');
const Grid = require("gridfs-stream");
const upload = require("./routes/upload");

// Connect Database
// Connect to DB
mongoose.set('strictQuery', false);
mongoose.connect(
    process.env.MONGODB_URI,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }
)
.then(() => console.log('💾 Connected to DB'))
.catch((err) => {
    console.error(err);
});

const conn = mongoose.connection;
conn.once("open", function () {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("pictures");
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./routes/home'));
app.use(require('./routes/auth/signin'));
app.use(require('./routes/auth/signout'));
app.use(require('./routes/auth/signup'));
app.use(require('./routes/adminDashboard'));
app.use(require('./routes/userDashboard'));
app.use(require('./routes/shop'));
app.use(require('./routes/cart'));
app.use(require('./routes/explore'));
app.use(require('./routes/support'));
app.use(require('./routes/purchase'));
app.use(require('./routes/flight'));
app.use(require('./routes/user'));
app.use("/file", upload);

// media routes
app.get("/file/:filename", async (req, res) => {
    try{
        const file = await gfs.files.findOne({ filename: req.params.filename });
        const readStream = gfs.createReadStream(file.filename);
        readStream.pipe(res);
    } catch (error) {
        res.send("not found");
    }
});

app.delete("/file/:filename", async (req, res) => {
    try {
        await gfs.files.deleteOne({ filename: req.params.filename });
        res.send("success");
    } catch (error) {
        console.log(error);
        res.send("An error occured.");
    }
});

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => console.log(`🏎  DRONE Server up and running at ${PORT}`));
