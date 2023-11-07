const blogSection = document.querySelector(".blogs-section");

const port = 8080
firebase.firestore().collection("blogs").get().then((blogs => {
    blogs.forEach(blog => {
        const blogId = blog.id
        const arr = blog.data().bannerImage.split('/');
        if (arr[2] !== `localhost:${port}`) {
            arr[2] = `localhost:${port}`
            // console.log(arr)
            console.log(arr.length)

            let newBannerImage = ""
            for (let i = 0; i < arr.length; i++) {
                if ((i + 1) === arr.length)
                    newBannerImage += arr[i]
                else
                    newBannerImage += arr[i] + '/'
                console.log(newBannerImage)
            }
            // console.log(newBannerImage)
            firebase.firestore().collection("blogs").doc(blogId).update({
                bannerImage: newBannerImage
            })
        }
        console.log(blog.data().bannerImage)
    })
}))

let count = 0
firebase.firestore().collection("blogs").where("publishedAt_month", ">", 1)
    .orderBy("publishedAt_month", "desc").get().then((blogs) => {
        blogs.forEach(blog => {
            if (blog.id != decodeURI(location.pathname.split("/").pop()) && count < 4) {
                createBlog(blog);
                console.log('createBlog fun i scalled')
            }
            else if (blog.id == decodeURI(location.pathname.split("/").pop())) {
                count--;
            }
            count++;
        })
    })

const createBlog = (blog) => {
    let data = blog.data();
    console.log('This is bannerImage', data.bannerImage)

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