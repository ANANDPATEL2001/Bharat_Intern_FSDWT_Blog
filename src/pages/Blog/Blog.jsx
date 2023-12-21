// import "../Home/Home.css"
// import "../Editor/Editor.css"
import "./Blog.css"
import db from "../../firebase";
// import "./BlogContent"

const Blog = () => {
    const blogId = decodeURI(window.location.pathname.split("/").pop());
    const docRef = db.collection("blogs").doc(blogId);

    docRef.get().then((doc) => {
        if (doc.exists) {
            // console.log(doc.data());
            setupBlog(doc.data());
        }
        else {
            window.location.replace("/")
        }
    }).catch(err => {
        console.log(err)
    })

    const setupBlog = (data) => {
        const banner = document.querySelector(".banner")
        const blogTitle = document.querySelector(".title")
        const titleTag = document.querySelector(".title")
        const publish = document.querySelector(".published")

        banner.style.backgroundImage = `url("${data.bannerImage}")`;

        // titleTag.innerHTML += blogTitle.innerHTML = data.title;
        titleTag.innerHTML += data.title;

        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        publish.innerHTML += `${data.publishedAt_date} ${months[data.publishedAt_month]} ${data.publishedAt_year}`;

        const article = document.querySelector(".article");
        const articleImageBox = document.querySelector(".article-image-collection");
        addArticle(article, articleImageBox, data.article);
    }

    const addArticle = (ele, imageBox, data) => {
        // console.log(data)
        data = data.split("\n").filter(item => item.length);
        // console.log(data)

        let flag = true
        let hCount = 1

        data.forEach(item => {
            // Check for Heading
            if (item[0] === "#") {
                // let hCount = 1;
                // let i = 0;
                // while (item[i] == "#") {
                //     hCount++;
                //     i++;
                // }
                if (flag === false && hCount < 6)
                    hCount++;
                let tag = `h${hCount}`;
                ele.innerHTML += `<${tag}>${item.slice(0, item.length)}</${tag}>`
                flag = false
            }

            else if (item[0] === "!" && item[1] === "[") {
                let seperator;

                for (let i = 0; i <= item.length; i++) {
                    if (item[i] === "]" && item[i + 1] === "(" && item[item.length - 1] === ")") {
                        seperator = i;
                    }
                }

                let alt = item.slice(2, seperator);
                let src = item.slice(seperator + 2, item.length - 1);
                imageBox.innerHTML += `<img src="${src}" alt="${alt}" class="article-image" />`;
            }

            else {
                ele.innerHTML += `<p>${item}</p>`;
            }
        })
    }




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

            // document.querySelector(".blogs-section").innerHTML = ""
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
            <div className="banner"></div>

            <div className="blog">
                <div className="info-container">
                    <h1 className="title"></h1>
                    <p className="published"><span>Published at - </span></p>
                    <div className="article"></div>
                </div>
                <div className="article-image-collection"></div>

                <h1 className="sub-heading">Recomended...</h1>

                {/* <!-- blog Section --> */}
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
            </div>
        </>
    )
}

export default Blog