import db from "../../firebase";
// import { db } from "./firebase";

const blogTitleField = document.querySelector(".title");
const articleField = document.querySelector(".article");

// Banner 
const bannerImage = document.querySelector("#banner-upload");
const banner = document.querySelector(".banner");
let bannerPath;


const publishBtn = document.querySelector(".publish-btn");
const uploadInput = document.querySelector("#image-upload");

bannerImage.addEventListener("change", () => {
    uploadImage(bannerImage, "banner")
})

uploadInput.addEventListener("change", () => {
    uploadImage(uploadInput, "image");
})

const uploadImage = (uploadFile, uploadType) => {

    // console.log("This is image", uploadFile)
    const [file] = uploadFile.files;
    // console.log("This is file", file)

    if (file && file.type.includes("image")) {
        const formdata = new FormData();
        formdata.append("image", file)

        // console.log("This is formdata", formdata)

        fetch("/upload", {
            method: "post",
            body: formdata
        }).then(res => {
            // console.log("This is res", res)
            return res.json()
        })
            .then(data => {
                // console.log("This is data", data)
                if (uploadType === "image")
                    addImage(data, file.name);
                else {
                    bannerPath = `${window.location.origin}/${data}`;
                    // console.log("This is bannerpath", bannerPath)
                    banner.style.backgroundImage = `url("${bannerPath}")`;
                }
            })
    }
    else {
        alert("Upload Image only");
    }
}

const addImage = (imagepath, alt) => {
    let curPos = articleField.selectionStart;
    let textToInsert = `\r![${alt}](${imagepath})\r`;
    articleField.value = articleField.value.slice(0, curPos) + textToInsert + articleField.value.slice(curPos);
}

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

publishBtn.addEventListener("click", () => {
    if (articleField.value.length && blogTitleField.value.length) {
        // Generating id
        let letters = 'abcdefghijklmnopqrstuvwxyz';
        let blogTitle = blogTitleField.value.split(" ").join("-");
        let id = '';

        for (let i = 0; i < 4; i++) {
            id += letters[Math.floor(Math.random() * letters.length)];
        }

        // Setting up DocName
        let docName = `${blogTitle}=${id}`;
        let date = new Date(); // for publish at info
        let arr = new Array(date.getDate(), date.getMonth(), date.getFullYear());

        // access firestore with db variable
        db.collection("blogs").doc(docName).set({
            title: blogTitleField.value,
            article: articleField.value,
            bannerImage: bannerPath,
            // publishedAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
            publishedAt_date: arr[0],
            publishedAt_month: arr[1],
            publishedAt_year: arr[2],
        })
            .then(() => {
                // console.log("Date Entered");
                window.location.href = `/${docName}`;
            })
            .catch((err) => {
                console.log(err);
            })
    }
})