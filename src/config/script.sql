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

-- Script para las regiones
INSERT INTO regions
  (regionname)
VALUES
  ('Región de Arica y Parinacota'),
  ('Región de Tarapacá'),
  ('Región de Antofagasta'),
  ('Región de Atacama'),
  ('Región de Coquimbo'),
  ('Región de Valparaíso'),
  ('Región Metropolitana de Santiago'),
  ("Región del Libertador General Bernardo O'Higgins"),
  ('Región del Maule'),
  ('Región de Ñuble'),
  ('Región del Biobío'),
  ('Región de La Araucanía'),
  ('Región de Los Ríos'),
  ('Región de Los Lagos'),
  ('Región Aysén del General Carlos Ibáñez del Campo'),
  ('Región de Magallanes y de la Antártica Chilena');

-- Script para generar los perfiles
INSERT INTO profiles
(profilename, profiledescription)
VALUES
('administrador', 'Usuario administrador que puede publicar, editar y eliminar productos de la tienda'),
('comprador', 'Usuario habilitado para realizar compras en la tienda')

-- Script para las ciudades con su region
INSERT INTO cities
  (name,id_region)
VALUES
	('Arica',1),
	('Camarones',1),
	('Putre',1),
	('General Lagos',1),
	('Iquique',2),
	('Alto Hospicio',2),
	('Pozo Almonte',2),
	('Camiña',2),
	('Colchane',2),
	('Huara',2),
	('Pica',2),
	('Antofagasta',3),
	('Mejillones',3),
	('Sierra Gorda',3),
	('Taltal',3),
	('Calama',3),
	('Ollagüe',3),
	('San Pedro de Atacama',3),
	('Tocopilla',3),
	('María Elena',3),
	('Copiapó',4),
	('Caldera',4),
	('Tierra Amarilla',4),
	('Chañaral',4),
	('Diego de Almagro',4),
	('Vallenar',4),
	('Alto del Carmen',4),
	('Freirina',4),
	('Huasco',4),
	('La Serena',5),
	('Coquimbo',5),
	('Andacollo',5),
	('La Higuera',5),
	('Paihuano',5),
	('Vicuña',5),
	('Illapel',5),
	('Canela',5),
	('Los Vilos',5),
	('Salamanca',5),
	('Ovalle',5),
	('Combarbalá',5),
	('Monte Patria',5),
	('Punitaqui',5),
	('Río Hurtado',5),
	('Valparaíso',6),
	('Casablanca',6),
	('Concón',6),
	('Juan Fernández',6),
	('Puchuncaví',6),
	('Quintero',6),
	('Viña del Mar',6),
	('Isla de Pascua',6),
	('Los Andes',6),
	('Calle Larga',6),
	('Rinconada',6),
	('San Esteban',6),
	('La Ligua',6),
	('Cabildo',6),
	('Papudo',6),
	('Petorca',6),
	('Zapallar',6),
	('Quillota',6),
	('La Calera',6),
	('Hijuelas',6),
	('La Cruz',6),
	('Nogales',6),
	('San Antonio',6),
	('Algarrobo',6),
	('Cartagena',6),
	('El Quisco',6),
	('El Tabo',6),
	('Santo Domingo',6),
	('San Felipe',6),
	('Catemu',6),
	('Llay-Llay',6),
	('Panquehue',6),
	('Putaendo',6),
	('Santa María',6),
	('Quilpué',6),
	('Limache',6),
	('Olmué',6),
	('Villa Alemana',6),
	('Rancagua',8),
	('Codegua',8),
	('Coinco',8),
	('Coltauco',8),
	('Doñihue',8),
	('Graneros',8),
	('Las Cabras',8),
	('Machalí',8),
	('Malloa',8),
	('Mostazal',8),
	('Olivar',8),
	('Peumo',8),
	('Pichidegua',8),
	('Quinta de Tilcoco',8),
	('Rengo',8),
	('Requínoa',8),
	('San Vicente',8),
	('Pichilemu',8),
	('La Estrella',8),
	('Litueche',8),
	('Marchihue',8),
	('Navidad',8),
	('Paredones',8),
	('San Fernando',8),
	('Chépica',8),
	('Chimbarongo',8),
	('Lolol',8),
	('Nancagua',8),
	('Palmilla',8),
	('Peralillo',8),
	('Placilla',8),
	('Pumanque',8),
	('Santa Cruz',8),
	('Talca',9),
	('Constitución',9),
	('Curepto',9),
	('Empedrado',9),
	('Maule',9),
	('Pelarco',9),
	('Pencahue',9),
	('Río Claro',9),
	('San Clemente',9),
	('San Rafael',9),
	('Cauquenes',9),
	('Chanco',9),
	('Pelluhue',9),
	('Curicó',9),
	('Hualañé',9),
	('Licantén',9),
	('Molina',9),
	('Rauco',9),
	('Romeral',9),
	('Sagrada Familia',9),
	('Teno',9),
	('Vichuquén',9),
	('Linares',9),
	('Colbún',9),
	('Longaví',9),
	('Parral',9),
	('Retiro',9),
	('San Javier',9),
	('Villa Alegre',9),
	('Yerbas Buenas',9),
	('Chillán',10),
	('Bulnes',10),
	('Chillán Viejo',10),
	('El Carmen',10),
	('Pemuco',10),
	('Pinto',10),
	('Quillón',10),
	('San Ignacio',10),
	('Yungay',10),
	('Quirihue',10),
	('Cobquecura',10),
	('Coelemu',10),
	('Ninhue',10),
	('Portezuelo',10),
	('Ránquil',10),
	('Treguaco',10),
	('San Carlos',10),
	('Coihueco',10),
	('Ñiquén',10),
	('San Fabián',10),
	('San Nicolás',10),
	('Concepción',11),
	('Coronel',11),
	('Chiguayante',11),
	('Florida',11),
	('Hualqui',11),
	('Lota',11),
	('Penco',11),
	('San Pedro de La Paz',11),
	('Santa Juana',11),
	('Talcahuano',11),
	('Tomé',11),
	('Hualpén',11),
	('Lebu',11),
	('Arauco',11),
	('Cañete',11),
	('Contulmo',11),
	('Curanilahue',11),
	('Los Álamos',11),
	('Tirúa',11),
	('Los Ángeles',11),
	('Antuco',11),
	('Cabrero',11),
	('Laja',11),
	('Mulchén',11),
	('Nacimiento',11),
	('Negrete',11),
	('Quilaco',11),
	('Quilleco',11),
	('San Rosendo',11),
	('Santa Bárbara',11),
	('Tucapel',11),
	('Yumbel',11),
	('Alto Biobío',11),
	('Temuco',12),
	('Carahue',12),
	('Cunco',12),
	('Curarrehue',12),
	('Freire',12),
	('Galvarino',12),
	('Gorbea',12),
	('Lautaro',12),
	('Loncoche',12),
	('Melipeuco',12),
	('Nueva Imperial',12),
	('Padre Las Casas',12),
	('Perquenco',12),
	('Pitrufquén',12),
	('Pucón',12),
	('Saavedra',12),
	('Teodoro Schmidt',12),
	('Toltén',12),
	('Vilcún',12),
	('Villarrica',12),
	('Cholchol',12),
	('Angol',12),
	('Collipulli',12),
	('Curacautín',12),
	('Ercilla',12),
	('Lonquimay',12),
	('Los Sauces',12),
	('Lumaco',12),
	('Purén',12),
	('Renaico',12),
	('Traiguén',12),
	('Victoria',12),
	('Valdivia',13),
	('Corral',13),
	('Lanco',13),
	('Los Lagos',13),
	('Máfil',13),
	('Mariquina',13),
	('Paillaco',13),
	('Panguipulli',13),
	('La Unión',13),
	('Futrono',13),
	('Lago Ranco',13),
	('Río Bueno',13),
	('Puerto Montt',14),
	('Calbuco',14),
	('Cochamó',14),
	('Fresia',14),
	('Frutillar',14),
	('Los Muermos',14),
	('Llanquihue',14),
	('Maullín',14),
	('Puerto Varas',14),
	('Castro',14),
	('Ancud',14),
	('Chonchi',14),
	('Curaco de Vélez',14),
	('Dalcahue',14),
	('Puqueldón',14),
	('Queilén',14),
	('Quellón',14),
	('Quemchi',14),
	('Quinchao',14),
	('Osorno',14),
	('Puerto Octay',14),
	('Purranque',14),
	('Puyehue',14),
	('Río Negro',14),
	('San Juan de la Costa',14),
	('San Pablo',14),
	('Chaitén',14),
	('Futaleufú',14),
	('Hualaihué',14),
	('Palena',14),
	('Coyhaique',15),
	('Lago Verde',15),
	('Aysén',15),
	('Cisnes',15),
	('Guaitecas',15),
	('Cochrane',15),
	('OHiggins',15),
	('Tortel',15),
	('Chile Chico',15),
	('Río Ibáñez',15),
	('Punta Arenas',16),
	('Laguna Blanca',16),
	('Río Verde',16),
	('San Gregorio',16),
	('Cabo de Hornos',16),
	('Antártica',16),
	('Porvenir',16),
	('Primavera',16),
	('Timaukel',16),
	('Natales',16),
	('Torres del Paine',16),
	('Santiago',7),
	('Cerrillos',7),
	('Cerro Navia',7),
	('Conchalí',7),
	('El Bosque',7),
	('Estación Central',7),
	('Huechuraba',7),
	('Independencia',7),
	('La Cisterna',7),
	('La Florida',7),
	('La Granja',7),
	('La Pintana',7),
	('La Reina',7),
	('Las Condes',7),
	('Lo Barnechea',7),
	('Lo Espejo',7),
	('Lo Prado',7),
	('Macul',7),
	('Maipú',7),
	('Ñuñoa',7),
	('Pedro Aguirre Cerda',7),
	('Peñalolén',7),
	('Providencia',7),
	('Pudahuel',7),
	('Quilicura',7),
	('Quinta Normal',7),
	('Recoleta',7),
	('Renca',7),
	('San Joaquín',7),
	('San Miguel',7),
	('San Ramón',7),
	('Vitacura',7),
	('Puente Alto',7),
	('Pirque',7),
	('San José de Maipo',7),
	('Colina',7),
	('Lampa',7),
	('Til Til',7),
	('San Bernardo',7),
	('Buin',7),
	('Calera de Tango',7),
	('Paine',7),
	('Melipilla',7),
	('Alhué',7),
	('Curacaví',7),
	('María Pinto',7),
	('San Pedro',7),
	('Talagante',7),
	('El Monte',7),
	('Isla de Maipo',7),
	('Padre Hurtado',7),
	('Peñaflor',7);
