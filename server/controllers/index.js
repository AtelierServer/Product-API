const product = require('../models/index.js');

module.exports = {

  getAll: async function(req, res) {
    const page = parseInt(req.query.page) || 1;
    const count = parseInt(req.query.count) || 5;

    try {
      const products = await product.products.getAll(count, page);
      res.status(200).json(products);
    } catch (err) {
      console.log("error getting product data", err);
      res.status(500).json({ error: err });
    }
  },

  getOne: async function(req, res) {
    try {
      const params = [req.params.id];
      const productData = await product.products.getOne(params);
      if (productData && productData.length > 0) {
        const response = productData[0];
        res.status(200).json(response);
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } catch(err) {
      console.log("error getting product based off id", err);
      res.status(500).json({ error: err.message });
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
  },

  getStyles: async function(req, res) {
    const params = [req.params.id];
    product.products.getProductStyles(params)
    .then((product) => {
      const response = {product_id: req.params.id, results: product}
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log("error getting styles", err);
      res.status(500).json({error: err});
    })
  }
}
