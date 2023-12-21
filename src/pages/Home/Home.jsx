import "./Home.css"
// import "./HomeContent"
import db from "../../firebase";

const Home = () => {
    const port = 3000
    db.collection("blogs").get().then((blogs => {
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
                db.collection("blogs").doc(blogId).update({
                    bannerImage: newBannerImage
                })
            }
            console.log(blog.data().bannerImage)
        })
    }))


    let count = 0
    db.collection("blogs").where("publishedAt_month", ">", 1)
        .orderBy("publishedAt_month", "desc").get().then((blogs) => {
            blogs.forEach(blog => {
                if (blog?.id !== decodeURI(window.location.pathname.split("/").pop()) && count < 4) {
                    console.log("createBlog fun is called")
                    createBlog(blog);
                }
                else if (blog?.id === decodeURI(window.location.pathname.split("/").pop())) {
                    count--;
                }
                count++;
            })

            document.querySelector(".blogs-section").innerHTML = ""
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

        console.log(data.bannerImage)

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


    return (
        <>
            <div className="header">
                <div className="content">
                    <h1 className="heading">
                        <span className="small">Welcome in the world of</span>
                        blog
                        <span className="no-fill">writing</span>
                    </h1>
                    <a href="/editor" className="btn">Write a Blog</a>
                </div>
            </div>

            <div className="blog-heading">
                <h1>Latest Published...</h1>
            </div>

            <div className="blogs-section">
                {/* <div className="blog-card">
                    <img src="https://plus.unsplash.com/premium_photo-1686041335799-a140e5b3b35d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1000&q=60"
                        alt="" className="blog-image" />

                    <h1 className="blog-title">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</h1>
                    <p className="blog-overview">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga distinctio sequi
                        eaque omnis iusto iste cum nisi expedita, perspiciatis mollitia eos voluptatum explicabo facere minus
                        autem illum ab atque deserunt.
                    </p>
                    <a href="/" className="btn dark">Read</a>
                </div> */}
            </div>
        </>
    )
}

export default Home