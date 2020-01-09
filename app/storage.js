const uri = "mongodb+srv://defaultuser:2WiI75ZCmEc037u8@adb-i6pvm.gcp.mongodb.net/test?retryWrites=true&w=majority";
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const crypto = require("crypto");
const mongoose = require('mongoose');

const conn = mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var upload;
var gfs;
conn.once("open", () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("uploads");
    const storage = new GridFsStorage({
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

    upload = multer({ storage });
    console.log("Connection Successful");
});

module.exports = {
    storage,
    // app.post("/image", upload.single("img"), (req, res, err) => {
    //     res.send("OKAY");
    // });
    getImage: async (filename, res) => {
        console.log("Entering getImage");
        console.log("Parameter ", filename);
        await gfs.files.findOne({ filename: filename })
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
                    return readstream;
                } else {
                    return ("Not an image");

                }
            }).catch(err => {
                return ("Error when retrieving the picture: " , err.message);

            });

        console.log("End of function");
    }
}



