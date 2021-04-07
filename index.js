const functions = require("firebase-functions");
const express = require('express');

const app = express();
app.use(express.static("public"));
app.get('/Isas',(req,res) => {
    res.send('isasssssssssss')
})

app.get('/contact', (req, res, next) => {
    res.sendFile(__dirname + '/public/contact.html')
  })
  
exports.app = functions.https.onRequest(app);
