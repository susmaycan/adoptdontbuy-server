const uri = "mongodb+srv://defaultuser:2WiI75ZCmEc037u8@adb-i6pvm.gcp.mongodb.net/test?retryWrites=true&w=majority";
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const crypto = require("crypto");
const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
const conn = mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var upload = multer({});
var gfs = {};
var storage = {};
conn.once("open", () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("uploads");
    storage = new GridFsStorage({
        url: uri,
        file: (req, file) => {
            return new Promise((resolve, reject) => {
                crypto.randomBytes(16, (err, buf) => {
                    if (err) {
                        return reject(err);
                    }
                    const filename = file.originalname;
                    const fileInfo = {
                        filename: filename,
                        bucketName: "uploads"
                    };
                    resolve(fileInfo);
                });
            });
        }
    });
    upload = multer({ storage }).single("img");
    console.log("Connection Successful");
});

module.exports = (app) => {
    app.get('/image/:photoId', (req, res, err) => {
        //const filename = req.params.photoId;
        const id = ObjectId(req.params.photoId);
        //console.log("Param ", filename);
        console.log("Entering getImage");
        gfs.files.findOne({ _id: id })
            .then(file => {
                if (!file || file.length === 0) {
                    console.log("Not file found");
                    return ("No file exists");
                }
                // Check if image
                if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
                    // Read output to browser
                    const readstream = gfs.createReadStream(file.filename);
                    readstream.pipe(res);
                } else {
                    return ("Not an image");

                }
            }).catch(err => {
                return ("Error when retrieving the picture: ", err.message);
            });

        console.log("End of function");
    });

    app.post("/image", (req, res, err) => {
        console.log("In ", req.body.img);
        upload(req, res, function (err) {
            console.log("Req file ", res.req.file);
            // if (err instanceof multer.MulterError) {
            //     console.log("Error when uploading the picture ", err.message);
            // } else if (err) {
            //     console.log("Error when uploading the picture ", err.message);
            // }
            res.status(201).send(res.req.file.id);
        });
    });
}

