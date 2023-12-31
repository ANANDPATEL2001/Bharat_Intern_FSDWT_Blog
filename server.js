const express = require("express")
const path = require("path")
const fileupload = require("express-fileupload")

const port = 8080;

let initial_path = path.join(__dirname, "public");

const app = express();
app.use(express.static(initial_path));
app.use(fileupload());






app.get("/", (req, res) => {
    // json is used below to pass multiple data/strings
    // res.status(200).json({
    //     message: "Your server started successfully",
    // })
    res.sendFile(path.join(initial_path, "home.html"))
});

app.get("/editor", (req, res) => {
    res.sendFile(path.join(initial_path, "editor.html"))
});

app.get("/:blog", (req, res) => {
    res.sendFile(path.join(initial_path, "blog.html"))
})

// app.use((req, res) => {
//     res.json(404);
// })

// Upload Link
app.post("/upload", (req, res) => {

    // console.log("This is request", req)
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

app.listen(port, () => {
    console.log(`Your server started at port ${port}`);
});

