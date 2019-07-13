const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const geojsonMerge = require('@mapbox/geojson-merge');

const fs = require('fs');

const folder = './USA/';

const utilty = require('../utilities/functions');

const request = require('request');
const cheerio = require('cheerio');
const cheerioTableparser = require('cheerio-tableparser');

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


// get state details
//========================================================================
router.get('/states/:state', async function (req, res) {

    const filePath = './counties/' +  req.params.state + '-county.geo.json';

    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});


// get county details
//========================================================================
router.get('/states/:state/county/:county', async function (req, res) {
    const state = req.params.state;
    const county = req.params.county;

    request(`https://countymap.org/${state}/${county}`, (err, response, html) => {
        if (!err && response.statusCode == 200) {
            const $ = cheerio.load(html);

            cheerioTableparser($);
            const data = $("table").parsetable();
            const total = data[1];
            const labels = data[0];
            const response = {
                data: [
                    { 
                        label: 'Facts',
                        name: 'title',
                        value: null,
                    },
                    { 
                        label: labels[2],
                        name: 'land_area',
                        value: total[2],
                    },
                    { 
                        label: labels[3],
                        name: 'population_density',
                        value: total[3],
                    },
                    { 
                        label: 'Population',
                        name: 'title',
                        value: null,
                    },
                    { 
                        label: labels[5],
                        name: 'population',
                        value: total[5],
                    },
                    { 
                        label: 'Population change',
                        name: 'population_change',
                        value: total[6],
                    },
                    { 
                        label: 'Under 5 years of age',
                        name: 'under_five_years',
                        value: total[7],
                    },
                    { 
                        label: 'Under 18',
                        name: 'under_eighteen',
                        value: total[8],
                    },
                    { 
                        label: '65 and over',
                        name: 'sixty_five_over',
                        value: total[9],
                    },
                    { 
                        label: 'Females',
                        name: 'females',
                        value: total[10],
                    },
                    { 
                        label: 'White',
                        name: 'white',
                        value: total[11],
                    },
                    { 
                        label: 'Hispanic or Latino of any race',
                        name: 'hispanic_or_latino',
                        value: total[12],
                    },
                    { 
                        label: 'Asian',
                        name: 'asian',
                        value: total[13],
                    },
                    { 
                        label: 'Two or more races',
                        name: 'two_or_more',
                        value: total[14],
                    },
                    { 
                        label: 'Black or African American',
                        name: 'black',
                        value: total[15],
                    },
                    { 
                        label: 'Native American',
                        name: 'native_american',
                        value: total[16],
                    },
                    { 
                        label: 'Pacific Islander',
                        name: 'pacific_islander',
                        value: total[17],
                    },
                    { 
                        label: 'Had graduated from high school',
                        name: 'highschool_graduate',
                        value: total[18],
                    },
                    { 
                        label: 'Had a bachelor degree or higher',
                        name: 'bachelor_degree',
                        value: total[19],
                    },
                    { 
                        label: 'Veterans',
                        name: 'bachelor_degree',
                        value: total[20],
                    },
                    { 
                        label: 'Households and Housing',
                        name: 'title',
                        value: null,
                    },
                    { 
                        label: 'Households',
                        name: 'households',
                        value: total[22],
                    },
                    { 
                        label: 'Persons per household',
                        name: 'persons_per_household',
                        value: total[23],
                    },
                    { 
                        label: 'Living in the same house for one year or more',
                        name: 'living_in_the_same_house',
                        value: total[24],
                    },
                    { 
                        label: 'Median household income',
                        name: 'median_household_income',
                        value: total[25],
                    },
                    { 
                        label: 'The Per capita income',
                        name: 'capita_per_income',
                        value: total[26],
                    },
                    { 
                        label: 'Live below the poverty line',
                        name: 'poverty_line',
                        value: total[27],
                    },
                    { 
                        label: 'Housing units',
                        name: 'housing_units',
                        value: total[28],
                    },
                    { 
                        label: 'Multi-unit structures',
                        name: 'multi_unit_structures',
                        value: total[29],
                    },
                    { 
                        label: 'The median value of owner-occupied housing',
                        name: 'median_value',
                        value: total[30],
                    },
                    { 
                        label: 'Residents owning their homes',
                        name: 'residents_owning_home',
                        value: total[31],
                    },
                    { 
                        label: 'Business Facts',
                        name: 'title',
                        value: null,
                    },
                    { 
                        label: 'Total number of firms',
                        name: 'total_firms',
                        value: total[33],
                    },
                    { 
                        label: 'Women-owned firms',
                        name: 'women_owned_firms',
                        value: total[34],
                    },
                    { 
                        label: 'Asian-owned firms',
                        name: 'asian_owned_firms',
                        value: total[35],
                    },
                    { 
                        label: 'Hispanic-owned firms',
                        name: 'hispanic_owned_firms',
                        value: total[36],
                    },
                    { 
                        label: 'Black-owned firms',
                        name: 'black_owned_firms',
                        value: total[37],
                    },
                    { 
                        label: 'Native American-owned firms',
                        name: 'american_owned_firms',
                        value: total[38],
                    },
                    { 
                        label: 'Pacific Islander-owned firms',
                        name: 'pacific_owned_firms',
                        value: total[39],
                    },
                    { 
                        label: 'Retail sales',
                        name: 'retail_sales',
                        value: total[40],
                    },
                    { 
                        label: 'Retail sales per capita',
                        name: 'retail_sales_per_capita',
                        value: total[41],
                    },
                    { 
                        label: 'Manufacturers shipments',
                        name: 'manufacturers_shipments',
                        value: total[42],
                    },
                    { 
                        label: 'Merchant wholesaler sales',
                        name: 'wholesaler_sales',
                        value: total[43],
                    },
                ]
            }

            res.json(response);
        }
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