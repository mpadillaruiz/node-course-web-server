const express= require('express');
const hbs=require('hbs');
const fs= require('fs');

var app=express();

//add a partial to reuse code
hbs.registerPartials(__dirname+'/views/partials');

//changing the template engine
app.set('view engine','hbs');
//Middleware allows to configurate how the app works. like a 3rd party add-on
//built-in middleware


//app.use is how you register middleware and it takes a function
app.use((req,res,next)=>{
  var now=new Date().toString();
  var log=(`${now}: ${req.method} ${req.url}`);
  console.log(log);
  fs.appendFile('server.log',log+'\n', (err)=>{
    if(err){
      console.log('Unable to append to server.log');
    }
  });
  next();
});

app.use((req,res,next)=>{
  res.render('maintenance.hbs');
});

//IT takes the path of the folder you want to serve
app.use(express.static(__dirname+'/public'));

//Helper for using the same function in multiple places
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});

//handler for an http request
//two arguments, request and respond
app.get('/',(req, res)=>{
  // res.send('<h1>hello Express!</h1>');
  res.render('home.hbs',{
    pageTitle:'Marta Page',
    welcomeMessage:'Welcome to Marta\'s page and profile'
  });
});

app.get('/about', (req,res)=>{
  //render allows you to render any view from your template
  //The second argument is an object that injects data into the .hbs document
  res.render('about.hbs',{
    pageTitle:'About Page',
  });
});

app.get('/bad', (req,res)=>{
  res.send({
    errorMessage: "Unable to handle request"
  });
});

//App for the app to start listened. the app is binned to a port.
//It is gonna listen to request until you tell them to stop
app.listen(3000, ()=>{
  console.log('Server is up on port 3000');
});
//app listen takes a second argument that allows to set a function once the server is up
//like the server is up
