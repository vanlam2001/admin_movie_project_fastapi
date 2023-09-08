import axios from "axios";


export const BASE_URL = "http://127.0.0.1:8000";

const Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

export let configHeaders = () => {
    return {
        Token: Token
    }
}

export const https = axios.create({
    baseURL: BASE_URL,
    headers: configHeaders()
})

