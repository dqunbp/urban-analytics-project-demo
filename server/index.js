'use strict';

var express = require('express'),
    app = express(),
    port = 4000,
    bodyParser = require('body-parser');

const db = require('./database').db;
const GeoModels = require('./models/GeoJson');
const functions = require('./functions');

var router = express.Router();

router.get('/', function (req, res) {
    res.json({ message: 'Welcome to our api!' });
});

router.get('/all', (req, res) => {
    console.log(req.method + ' request: ' + req.url);
    GeoModels.mytishiModel.find((error, data) => {
        if (error) {
            console.error(error);
        }
        res.send(data)
    });
});

router.post('/select', function (req, res) {
    try {
        let polygon = functions.getPolygonFromCoords(req.body.coords);
        console.log('poly', polygon);
        console.log('from req', req.body.coords);

        GeoModels.within(
            polygon,
            (err, data) => {
                if (err) { console.log('ERROR: ', err); }
                res.send(data);
            }
        )

    } catch (error) {
        console.log(error);
    }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);
app.listen(port);
console.log('Listening on port ' + port + '...');