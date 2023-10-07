const blogSection = document.querySelector(".blogs-section");

let count = 0
firebase.firestore().collection("blogs").where("publishedAt_month", ">", 1)
    .orderBy("publishedAt_month", "desc").get().then((blogs) => {
        blogs.forEach(blog => {
            if (blog.id != decodeURI(location.pathname.split("/").pop()) && count < 4) {
                createBlog(blog);
            }
            else if (blog.id == decodeURI(location.pathname.split("/").pop())) {
                count--;
            }
            count++;
        })
    })

const createBlog = (blog) => {
    let data = blog.data();

    let articleData = data.article;
    // console.log(articleData)
    let splitData = articleData.split("\n").filter(item => item.length);
    // console.log(splitData)
    let para;

    splitData.forEach(item => {
        if (item[0] != "#" && item[0] != "!") {
            para = item;
            // console.log(para)
            return
        }
    })

    blogSection.innerHTML += `
    <div class="blog-card">
            <img src="${data.bannerImage}"
                alt="Loading your Image" class="blog-image">

            <div class="blog-items">
                <h1 class="blog-title">${data.title.substring(0, 100) + "..."}</h1>
                <p class="blog-overview">${para.substring(0, 200) + "..."}</p>
                <a href="/${blog.id}" class="btn dark">Read</a>
            </div
        </div>
    `;
}