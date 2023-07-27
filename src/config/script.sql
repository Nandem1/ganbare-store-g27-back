CREATE DATABASE ganbareStore;

\c ganbareStore;

CREATE TABLE regions (
  region_id SERIAL PRIMARY KEY,
  regionName VARCHAR(100) NOT NULL
);

CREATE TABLE cities (
  city_id SERIAL PRIMARY KEY,
  cityName VARCHAR(100) NOT NULL,
  region_id INT NOT NULL,
  FOREIGN KEY (region_id) REFERENCES regions(region_id)
);

CREATE TABLE profiles (
  profile_id SERIAL PRIMARY KEY,
  profileName VARCHAR(100) NOT NULL,
  profileDescription TEXT
);

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  userRut VARCHAR(12) NOT NULL,
  userEmail VARCHAR(255) NOT NULL,
  userAddress VARCHAR(255),
  userPhone VARCHAR(12),
  password VARCHAR(255) NOT NULL,
  profile_id INT NOT NULL,
  city_id INT NOT NULL,
  FOREIGN KEY (profile_id) REFERENCES profiles(profile_id),
  FOREIGN KEY (city_id) REFERENCES cities(city_id)
);

CREATE TABLE categories (
  category_id SERIAL PRIMARY KEY,
  categoryname VARCHAR(100) NOT NULL,
  categorydescription TEXT
);

CREATE TABLE products (
  product_id BIGSERIAL PRIMARY KEY,
  category_id INT NOT NULL,
  productname VARCHAR(255) NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  stock INT NOT NULL,
  garantia VARCHAR(100),
  description TEXT,
  image VARCHAR(255),
  FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

CREATE TABLE userCart (
  cart_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  product_id BIGINT NOT NULL,
  cantidad INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE fav (
  fav_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  product_id BIGINT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);