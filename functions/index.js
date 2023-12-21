const functions = require("firebase-functions")
const express = require("express")
const cors = require("cors")
const fileupload = require("express-fileupload")
const path = require("path")
const bodyParser = require('body-parser')

// const port = process.env.USER_PORT || 3000;

let initial_path = path.join(__dirname, "build");

const app = express();
app.use(cors({ origin: true }))

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(express.static(initial_path));
app.use(fileupload());




app.get("/", (req, res) => {
    // json is used below to pass multiple data/strings
    res.status(200).json({
        message: "Welcome to the Blog Website",
    })
    // res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

app.get("/hello", (req, res) => {
    // json is used below to pass multiple data/strings
    // res.status(200).json({
    //     message: "Hello World",
    // })
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
});






// app.get("/", (req, res) => {
//     res.sendFile(path.join(initial_path, "home.html"))
// })

// app.get("/home", (req, res) => {
//     res.sendFile(path.join(initial_path, "home.html"))
// });

app.get("/editor", (req, res) => {
    res.sendFile(path.join(__dirname, "Editor", "editor.html"))
});

// app.get("/:blog", (req, res) => {
//     res.sendFile(path.join(initial_path, "blog.html"))
// })

// app.use((req, res) => {
//     res.json(404);
// })






// Upload Link
app.post("/upload", (req, res) => {

    console.log("This is request", req)
    let file = req.files.image;
    let date = new Date();

    // Image Name
    let imagename = date.getDate() + date.getTime() + file.name;
    // console.log("This is Image name", imagename)

    // Image upload path
    let path = "public/uploads/" + imagename;

    // Create upload
    // Here, mv function is used to create upload
    file.mv(path, (err, result) => {
        // console.log("This is path", path)

        if (err) {
            // console.log(err)
            throw err;
        }
        else {
            // Our image Upload path
            res.json(`uploads/${imagename}`)
        }
    })
})





app.get("*", (req, res) => {
    res.status(404).json({
        message: "This route does not exist !!",
    });
});

// app.listen(port, () => {
//     console.log(`Your server started at port ${port}`);
// });


exports.app = functions.https.onRequest(app)
// Our Local Endpoint
// http://127.0.0.1:5001/blogging-website-3c10f/us-central1/app/