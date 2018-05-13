'use strict';

const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, 'public');
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
var cors = require('cors');

const db = require('./database').db;
const GeoModels = require('./models/GeoJson');
const functions = require('./functions');

var router = express.Router();

app.get('/index', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

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
    console.log(req.method + ' request: ' + req.url);
    try {
        let polygon = functions.getPolygonFromCoords(req.body.coordinates);
        // console.log('poly', polygon);
        // console.log('coordinates from req', req.body.coordinates);

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

app.use(cors());
app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);
app.listen(port);
console.log('Listening on port ' + port + '...');