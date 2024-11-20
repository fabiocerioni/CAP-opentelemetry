const express = require('express');
const fesr = require("@sap/fesr-to-otel-js");
const app = express();
module.exports = async function () {
    this.on('hello', async (req) => {
        return `Hello ${req.data.to}!`;
    });
    this.on('add', async (req) => {
        return req.data.x + req.data.to
    })
    this.on('bootstrap', async (req) => {
        fesr.registerFesrEndpoint(app);
    })

}