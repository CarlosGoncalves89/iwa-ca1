const express = require('express'); // import express to create a local server.
const fs = require('fs'); // fs is a file stream import.
const path = require('path'); // path can obtain a local path on server.

const app = express(); // init express.
const port = process.env.PORT || 3000; // select a default port if .env is not present.


app.use('/css', express.static(__dirname + '/assets/css')); // create a folder on server, and link with static import
app.use('/js', express.static(__dirname + '/assets/js')); // create a folder on server, and link with static import