import express from "express"

const api = express()

export function setupApi() {
    api.listen("4000", () => {
        console.log("Listening")
    })
}