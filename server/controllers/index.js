const product = require('../models/index.js');

module.exports = {
 getAll: function(req, res) {
  product.products.getAll()
  .then(product => {
    res.status(200).json(product)
  })
  .catch((err) => {
    console.log("error getting product data", err);
    res.status(500).json({error: err});
  })
},

getOne: async function(req, res) {
  try {
    const params = [req.params.id];

    const features = await product.products.getOneFeatures(params);

    product.products.getOne(params)
    .then((productData) => {
      const response = productData[0]
      response.features = features;
      res.status(200).json(response);
    });
  } catch(err) {
    console.log("error getting product based off id", err);
    res.status(500).json({error: err});
  }
},
  getRelated: async function(req,res) {
    const params = [req.params.id];
    product.products.getRelated(params)
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((err) => {
      console.log("error getting RELATED products based off id", err);
      res.status(500).json({error: err});
    })
  }
}
