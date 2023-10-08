const blogId = decodeURI(location.pathname.split("/").pop());
const docRef = firebase.firestore().collection("blogs").doc(blogId);
docRef.get().then((doc) => {
    if (doc.exists) {
        // console.log(doc.data());
        setupBlog(doc.data());
    }
    else {
        location.replace("/")
    }
})
const setupBlog = (data) => {
    const banner = document.querySelector(".banner")
    const blogTitle = document.querySelector(".title")
    const titleTag = document.querySelector(".title")
    const publish = document.querySelector(".published")
    banner.style.backgroundImage = `url("${data.bannerImage}")`;
    titleTag.innerHTML += blogTitle.innerHTML = data.title;
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    publish.innerHTML += `${data.publishedAt_date} ${months[data.publishedAt_month]} ${data.publishedAt_year}`;

    const article = document.querySelector(".article");
    const articleImageBox = document.querySelector(".article-image-collection");
    addArticle(article, articleImageBox, data.article);
}

const addArticle = (ele, imageBox, data) => {
    console.log(data)
    data = data.split("\n").filter(item => item.length);
    console.log(data)


    let flag = true
    let hCount = 1
    data.forEach(item => {
        // Check for Heading
        if (item[0] == "#") {
            // let hCount = 1;
            // let i = 0;
            // while (item[i] == "#") {
            //     hCount++;
            //     i++;
            // }
            if (flag == false && hCount < 6)
                hCount++;
            let tag = `h${hCount}`;
            ele.innerHTML += `<${tag}>${item.slice(0, item.length)}</${tag}>`
            flag = false
        }
        else if (item[0] == "!" && item[1] == "[") {
            let seperator;
            for (let i = 0; i <= item.length; i++) {
                if (item[i] == "]" && item[i + 1] == "(" && item[item.length - 1] == ")") {
                    seperator = i;
                }
            }

            let alt = item.slice(2, seperator);
            let src = item.slice(seperator + 2, item.length - 1);
            imageBox.innerHTML += `<img src="${src}" alt="${alt}" class="article-image">`;
        }

        else {
            ele.innerHTML += `<p>${item}</p>`;
        }
    })
}