const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const geojsonMerge = require('@mapbox/geojson-merge');

const fs = require('fs');

const folder = './USA/';

const utilty = require('../utilities/functions');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTES FOR OUR API
// =============================================================================
const router = express.Router(); 

router.get('/', function (req, res) {
    res.send('qp api');
});


// get customer details
//========================================================================
router.get('/states/:state', async function (req, res) {

    const filePath = './counties/' +  req.params.state + '-county.geo.json';

    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});


// // products
// //========================================================================
// router.get('/products', function (req, res) {

//     var url_parts = url.parse(req.url, true);
//     var query = url_parts.search;

//     wooCommerce.getAsync('products' + query).then(function(result) {
//         res.json(JSON.parse(result.toJSON().body));
//     });
// });

// // search products
// //========================================================================
// router.get('/products/search/:q', function (req, res) {

//     var url_parts = url.parse(req.url, true);
//     var query = url_parts.search;

//     wooCommerce.getAsync('products?filter[q]=' + req.params.id + query).then(function(result) {
//         res.json(JSON.parse(result.toJSON().body));
//     });
// });

module.exports = router;