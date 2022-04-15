const express = require('express'); // import express to create a local server.
const fs = require('fs'); // fs is a file stream import.
const path = require('path'); // path can obtain a local path on server.

const app = express(); // init express.
const port = process.env.PORT || 3000; // select a default port if .env is not present.

app.use('/css', express.static(__dirname + '/assets/css')); // create a folder on server, and link with static import
app.use('/js', express.static(__dirname + '/assets/js')); // create a folder on server, and link with static import


app.use(express.json()); // read json files from request body

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/views/index.html')); // create a path to index.html
});

app.get('/about', function(req, res) {
  res.sendFile(path.join(__dirname, '/views/about.html')); // create an about page
});


//** Endpoint to read the json file and return an javascript object array of products */
app.get('/products' , function(req,res) {
  const data = fs.readFileSync(path.join(__dirname, '/assets/data/products.json'), 'utf-8')
  res.json(JSON.parse(data));
})

//** Endpoint to write at json file and save the product from request body */
app.post('/product' , function(req, res) {
  const data = fs.readFileSync(path.join(__dirname, '/assets/data/products.json'), 'utf-8')
  const jsonArr = JSON.parse(data); 

  req.body.id = Number(jsonArr.length + 1)
  jsonArr.push(req.body)

  const json = JSON.stringify(jsonArr)

  fs.writeFileSync(path.join(__dirname, '/assets/data/products.json'), json)
  res.json(req.body)
})

//** Endpoint to delete the product from json file */
app.delete('/product', function(req, res) {
  const data = fs.readFileSync(path.join(__dirname, '/assets/data/products.json'), 'utf-8')
  const jsonArr = JSON.parse(data); 
  
  const filtered = jsonArr.filter((data) => {
    const result = req.body.find((p) => p === data.id)

    if(result) return;
    return data;
  })

  const json = JSON.stringify(filtered)

  fs.writeFileSync(path.join(__dirname, '/assets/data/products.json'), json)
  res.json(req.body)
})

//** Endpoint to read the json file and return an javascript object array of categories */
app.get('/category' , function(req,res) {
  const data = fs.readFileSync(path.join(__dirname, '/assets/data/categoryProduct.json'), 'utf-8')
  res.json(JSON.parse(data));
})

//** start the server */
app.listen(port, () => {
  console.log("Server start at  port:", port)
});
