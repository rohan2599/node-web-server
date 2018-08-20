const express = require('express');
const hbs = require('hbs');
const fs =require('fs');

var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
//app.use(express.static(__dirname+'/public'));
app.use((req,res,next)=>{
  var flag = new Date().toString();
  var log = `${flag}:${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log +'/n',(err)=>{
    if(err){
      console.log('unable to append the content to log file');
    }
  });
  next();

});

// this middleware does not let execute the home page and other page
app.use((req,res,next)=>{
  res.render('maintenance.hbs');
 });

app.use(express.static(__dirname+'/public'));


hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
});


hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
})



app.get('/',(req,res)=>{
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  });
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
     pageTitle: 'About Page'
  })

});

//sends error back with json message
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});