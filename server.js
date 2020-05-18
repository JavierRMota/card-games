const express=require('express');
const bodyParser=require('body-parser');
const routes =require('./routes/blackjack-routes');
const errorController= require('./controllers/error-controller').errorController;
const app=express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(routes);
app.use(errorController);
mongoose.connect('mongodb://localhost/card-games',{useNewUrlParser: true,useUnifiedTopology: true})
.then(() => {
    app.listen(8080,()=>{console.log('Servidor en línea')});
}).catch(err => console.log(err))