const express= require('express');
const app= express();


//Middlewares
// app.use('/posts',()=>{
// console.log('This is a middlewares running');
// });
//ROUTES
app.get('/',(req,res)=>{
    res.send('we are on home');
});
app.get('/posts',(req,res)=>{
    res.send('we are on psosts');
});

//How to we start listening to the server
app.listen(3000);