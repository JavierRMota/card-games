const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/blackjack-routes');
const errorController = require('./controllers/error-controller').errorController;
const PORT = process.env.PORT || 8081;
const PORT_SOCKET =  8082
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
routes(app);
app.use(errorController);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); //@todo Change this before deployment for security reasons.
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

mongoose.connect('mongodb://localhost/card-games', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => { console.log(`Server online | http://localhost:${PORT}/`) });
    }).catch(err => console.log(err))