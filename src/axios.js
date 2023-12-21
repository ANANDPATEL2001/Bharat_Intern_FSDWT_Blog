import axios from "axios"

const instance = axios.create({
    baseURL: "http://127.0.0.1:5001/blogging-website-3c10f/us-central1/app"
})

export default instance