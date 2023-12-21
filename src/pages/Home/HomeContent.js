import db from "../../firebase";
import "./Home.css";
// import firebase from 'firebase/compat/app'
// import { Firestore } from "firebase/firestore";

const blogSection = document.querySelector(".blogs-section");

let count = 0
db.collection("blogs").where("publishedAt_month", ">", 1)
    .orderBy("publishedAt_month", "desc").get().then((blogs) => {
        blogs.forEach(blog => {
            if (blog?.id !== decodeURI(window.location.pathname.split("/").pop()) && count < 4) {
                createBlog(blog);
            }
            else if (blog?.id === decodeURI(window.location.pathname.split("/").pop())) {
                count--;
            }
            count++;
        })
    })

const createBlog = async (blog) => {
    let data = await blog.data();

    let articleData = await data.article;
    // console.log(articleData)
    let splitData = await articleData.split("\n").filter(item => item.length);
    // console.log(splitData)
    let para;

    splitData.forEach(item => {
        if (item[0] !== "#" && item[0] !== "!") {
            para = item;
            // console.log(para)
            return
        }
    })

    document.querySelector(".blogs-section").innerHTML += `
        <div class="blog-card">
                <img src="${data.bannerImage}"
                    alt="Loading your Image" class="blog-image" />
    
                <div class="blog-items">
                    <h1 class="blog-title fw-bolder">${data.title.substring(0, 100) + "..."}</h1>
                    <p class="blog-overview">${para.substring(0, 200) + "..."}</p>
                    <a href="/${blog.id}" class="btn dark">Read</a>
                </div
            </div>
        `;
}
