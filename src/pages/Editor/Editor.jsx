import { useState } from "react";

import "./Editor.css"
import db from "../../firebase";
import { BsUpload } from "react-icons/bs";
import axios from "axios";
// import axios from "../../axios";
// import "./EditorContent"




const Editor = () => {
    const [image, setImage] = useState('')

    const blogTitleField = document.querySelector(".title");
    const articleField = document.querySelector(".article");

    // Banner 
    const bannerImage = document.querySelector("#banner-upload");
    const banner = document.querySelector(".banner");
    let bannerPath;


    const publishBtn = document.querySelector(".publish-btn");
    const uploadInput = document.querySelector("#image-upload");

    const bannerUpload = () => {
        // uploadImage(bannerImage, "banner")
        uploadImage(document.querySelector("#banner-upload"), "banner")
    }

    const imageUpload = () => {
        // uploadImage(uploadInput, "image")
        uploadImage(document.querySelector("#image-upload"), "image")
    }

    // Below, 'DOMContentLoaded' is used with 'addEventListener' to execute contained 'addEventListener' after the DOM is fully loaded as it  will throw an error if used without it because initially event 'change' will return 'NULL'

    // document.addEventListener("DOMContentLoaded", () => {
    //     bannerImage.addEventListener("change", () => {
    //         uploadImage(bannerImage, "banner")
    //     })

    //     uploadInput.addEventListener("change", () => {
    //         uploadImage(uploadInput, "image");
    //     })
    // })

    const uploadImage = (uploadFile, uploadType) => {

        console.log("This is image", uploadFile)
        console.log("This is file list", uploadFile.files)
        const [file] = uploadFile.files;
        console.log("This is individual file", file)

        if (file && file.type.includes("image")) {
            const formdata = new FormData();
            // formdata.append("image", file)
            // console.log("This is formdata", formdata)


            // const options1 = {
            //     method: 'POST',
            //     body: formdata,
            //     mode: 'no-cors',
            //     header: {
            //         'Content-Type': 'multipart/form-data'
            //     }
            // }

            // const options2 = {
            //     method: 'POST',
            //     body: JSON.stringify(file),
            //     body: uploadFile,
            //     mode: 'no-cors',
            //     headers: {
            //         'Content-Type': 'image/jpeg',
            //     },
            // }

            // fetch('http://127.0.0.1:5001/blogging-website-3c10f/us-central1/app/upload', {
            //     method: 'post',
            //     body: formdata,
            // })
            // fetch('http://127.0.0.1:5001/blogging-website-3c10f/us-central1/app/upload', options2)

            setImage(uploadFile.files[0]);
            formdata.append('image', image)
            axios.postForm('http://127.0.0.1:5001/blogging-website-3c10f/us-central1/app/upload', formdata)
                .then(res => {
                    console.log("This is res", res)
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

    document.addEventListener("DOMContentLoaded", () => {
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
    })



    return (
        <div>
            <div className="banner">
                <input type="file" accept="image/*" id="banner-upload" onChange={bannerUpload} hidden />
                <label htmlFor="banner-upload" className="banner-upload-btn"><img src="https://th.bing.com/th/id/R.b8b98667496dff6c2a04d8dc98a28e10?rik=6AIhuGRS%2fa0JVg&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_523458.png&ehk=MsOIuGWZGtuXqB7IAkYDqbWHnc%2bb300R7Z7B5q05f4A%3d&risl=&pid=ImgRaw&r=0"
                    alt="upload your banner" /></label>
            </div>

            <div className="blog w-70">
                <textarea type="text" className="title" placeholder="Blog title..."></textarea>
                <textarea type="text" className="article" placeholder="Start Writing here..."></textarea>
            </div>

            <div className="blog-options">
                <button className="btn dark publish-btn">Publish</button>

                <input type="file" accept="image/*" id="image-upload" onChange={imageUpload} hidden />
                <label htmlFor="image-upload" className="btn grey upload-btn">Upload Image</label>
            </div>
        </div>
    )
}

export default Editor