const db = require('../db.js');

module.exports = {

  getAll: async function(count, page) {
    try {
      const offset = (page - 1) * count;
      const query = `SELECT * FROM product ORDER BY id ASC LIMIT ${count} OFFSET ${offset}`;
      const res = await db.query(query);
      return res.rows;
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
  },

  getProductStyles: async function(params) {
    try {
      const query2 = "SELECT styles.id as styles_id, styles.name, styles.original_price, styles.sale_price, styles.default_style, (SELECT json_agg(json_build_object('url', photos.url::text, 'thumbnail_url', photos.thumbnail_url::text)) AS photos FROM photos WHERE photos.styleid = styles.id) AS photos, (SELECT json_agg(json_build_object('size', skus.size::text, 'quantity', skus.quantity)) AS skus FROM skus WHERE skus.styleid = styles.id) AS skus FROM styles WHERE styles.product_id = $1";
      const res = await db.query(query2, params);
      return res.rows;
    } catch (err) {
      console.log("error inside getStyles model", err);
      throw err;
    }
  },
}