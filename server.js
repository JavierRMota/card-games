const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/blackjack-routes');
const errorController = require('./controllers/error-controller').errorController;
const PORT = process.env.PORT || 8081;
const PORT_SOCKET =  8082
const app = express();
const cors = require('cors')
app.use(cors())

app.use(bodyParser.json());
routes(app);
app.use(errorController);

mongoose.connect('mongodb://localhost/card-games', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => { console.log(`Server online | http://localhost:${PORT}/`) });
    }).catch(err => console.log(err))