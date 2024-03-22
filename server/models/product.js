const db = require('../db.js');

module.exports = {

  getAll: async function() {
    try {
    const query = 'SELECT * FROM product ORDER BY id ASC LIMIT 10000 '
    const res = await db.query(query);
    return res.rows
  } catch (err) {
    console.log("error inside getAll model", err);
    throw err;
  }
},
  getOneFeatures: async function(params) {
    try {
      const query = 'SELECT * FROM features WHERE product_id = $1'
      const res = await db.query(query, params);
      // return res.rows
      const features = res.rows.map(feature => {
        return {feature: feature.feature, value: feature.value};
      });
      return features;
    } catch (err) {
      console.log("error inside getOne model", err);
      throw err;
    }
  },
  getOne: async function(params) {
    try {
      const query = 'SELECT * FROM product WHERE id = $1'
      const res = await db.query(query, params);
     return res.rows;
      console.log("resrows, getOne", res.rows);
    } catch (err) {
      console.log("error inside getOne model", err);
      throw err;
    }
  },
  getRelated: async function(params) {
    try {
      const query = 'SELECT id from related WHERE current_product_id = $1'
      const res = await db.query(query, params);
      return res.rows;
    } catch (err) {
      console.log("error inside getRelatedList model", err);
      throw err;
    }
  }
}