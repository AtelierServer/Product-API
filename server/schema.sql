DROP DATABASE IF EXISTS sdc;

CREATE DATABASE sdc;

\c sdc;

DROP TABLE IF EXISTS product CASCADE;
DROP TABLE IF EXISTS styles CASCADE;
DROP TABLE IF EXISTS related CASCADE;
DROP TABLE IF EXISTS features CASCADE;
DROP TABLE IF EXISTS photos CASCADE;
DROP TABLE IF EXISTS skus CASCADE;

CREATE TABLE product (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  slogan VARCHAR(1000),
  description VARCHAR(1000),
  category VARCHAR(100),
  default_price INTEGER
);

CREATE TABLE styles (
  id SERIAL PRIMARY KEY,
  product_id INTEGER,
  name VARCHAR(255),
  original_price INTEGER,
  sale_price INTEGER,
  default_style BOOLEAN
);

CREATE TABLE related (
  id SERIAL PRIMARY KEY,
  current_product_id INTEGER,
  related_product_id INTEGER
);

CREATE TABLE features (
  id SERIAL PRIMARY KEY,
  product_id INTEGER,
  feature VARCHAR(255),
  value VARCHAR(255)
);

CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  styleid INTEGER,
  url VARCHAR,
  thumbnail_url VARCHAR
);

CREATE TABLE skus (
  id SERIAL PRIMARY KEY,
  styleid INTEGER,
  size VARCHAR(10),
  quantity INTEGER
);

ALTER TABLE styles ADD FOREIGN KEY (product_id) REFERENCES product(id);
ALTER TABLE features ADD FOREIGN KEY (product_id) REFERENCES product(id);
ALTER TABLE photos ADD FOREIGN KEY (styleid) REFERENCES styles(id);
ALTER TABLE skus ADD FOREIGN KEY (styleid) REFERENCES styles(id);
ALTER TABLE related ADD FOREIGN KEY (product_id) REFERENCES product(id);

CREATE INDEX idx_styles_product_id ON styles (product_id);
CREATE INDEX idx_photos_styleid ON photos (styleid);
CREATE INDEX idx_skus_styleid ON skus (styleid);
CREATE INDEX idx_related_id ON related (current_product_id);

\copy product(id, name, slogan, description, category, default_price) FROM 'server/data/product.csv' DELIMITER ',' CSV HEADER;
\copy styles(id, product_id, name, original_price, sale_price, default_style) FROM 'server/data/styles.csv' DELIMITER ',' CSV HEADER;
\copy related(id, current_product_id, related_product_id) FROM 'server/data/related.csv' DELIMITER ',' CSV HEADER;
\copy photos(id, styleid, url, thumbnail_url) FROM 'server/data/photos.csv' DELIMITER ',' CSV HEADER;
\copy features(id, product_id, feature, value) FROM 'server/data/features.csv' DELIMITER ',' CSV HEADER;
\copy skus(id, styleid, size, quantity) FROM 'server/data/skus.csv' DELIMITER ',' CSV HEADER;





