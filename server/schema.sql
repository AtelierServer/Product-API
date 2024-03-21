DROP DATABASE IF EXISTS sdc;

CREATE DATABASE sdc;

\c sdc;

DROP TABLE IF EXISTS product;

CREATE TABLE product (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  slogan VARCHAR(1000),
  description VARCHAR(1000),
  category VARCHAR(100),
  default_price INTEGER
);

DROP TABLE IF EXISTS styles;

CREATE TABLE styles (
  id SERIAL PRIMARY KEY,
  product_id INTEGER,
  name VARCHAR(255),
  original_price INTEGER,
  sale_price INTEGER,
  default_value BOOLEAN
);

DROP TABLE IF EXISTS related;

CREATE TABLE related (
  id SERIAL PRIMARY KEY,
  product_id INTEGER,
  related_product_id INTEGER
);

DROP TABLE IF EXISTS features;

CREATE TABLE features (
  id SERIAL PRIMARY KEY,
  product_id INTEGER,
  feature VARCHAR(255),
  value VARCHAR(255)
);

DROP TABLE IF EXISTS photos;

CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  styles_id INTEGER,
  thumbnail_url VARCHAR(1000),
  url VARCHAR(1000)
);

DROP TABLE IF EXISTS skus;

CREATE TABLE skus (
  id SERIAL PRIMARY KEY,
  styles_id INTEGER,
  quantity INTEGER,
  size VARCHAR(10)
);

ALTER TABLE styles ADD FOREIGN KEY (product_id) REFERENCES product (id);
ALTER TABLE features ADD FOREIGN KEY (product_id) REFERENCES product (id);
ALTER TABLE photos ADD FOREIGN KEY (styles_id) REFERENCES styles (id);
ALTER TABLE skus ADD FOREIGN KEY (styles_id) REFERENCES styles (id);
ALTER TABLE related ADD FOREIGN KEY (product_id) REFERENCES product (id);
