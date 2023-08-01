# Proyecto Final: Ecommerce Ganbare Store
## Grupo
Proyecto realizado por:
 - Vicente Aguirre
 - Isabel Palacios
 - Katia Velasquez

## Instalación

Para poder correr el proyecto necesitas realizar los siguientes pasos:

 - Descarga el proyecto y ábrelo en vsCode.
 - Ejecuta el comando ```npm install ``` (para instalar dependencias necesarias para el proyecto).
 - Ejecuta el comando ```npm run dev ``` (para levantar el proyecto).

## Descripción
Proyecto de Backend de Tienda Ecommerce desarrollado con Code.js y Express como parte del proyecto final para la carrera de Desarrollo FullStack JS en Desafío Latam.
Se utilizaron las siguientes librerías:

 -  bcrypt y bcryptjs: Librerías para el cifrado seguro de contraseñas.
-   compression: Middleware para comprimir respuestas HTTP.
-   cors: Middleware para habilitar el intercambio de recursos de origen cruzado (CORS).
-   dotenv: Librería para cargar variables de entorno desde un archivo .env.
-   express: Marco de trabajo web para aplicaciones de Node.js.
-   jest: Marco de pruebas para aplicaciones JavaScript/Node.js.
-   jsonwebtoken: Librería para trabajar con Tokens Web JSON (JWT).
-   nodemon: Utilidad para reiniciar automáticamente la aplicación de Node.js cuando los archivos cambian durante el desarrollo.
-   pg: Librería para interactuar con bases de datos PostgreSQL.
-   supertest: Librería para realizar solicitudes HTTP a su aplicación Express en pruebas.

## Consideraciones

El proyecto tiene los siguientes endpoints:	

## Usuarios

 **/users:** Obtiene un listado con todos los usarios.
 **/users/register:** Se registra un usuario con la siguiente estructura:
 newUser = {
  userEmail: 'email',
  userAddress: 'Calle de prueba 123',
  password: 'password123',
  profile_id: 1(administrador) 2(usuario),
  city_id: 1,
  userRut: '123456789',
  userPhone: '987654321',
};
 **/users/login:** Ruta para autenticar usuario con la siguiente estructura:
 - user={
	 userEmail: 'email',
	 password: 'password123'
}

## Productos

**/products/allproducts:** Ruta para obtener todos los productos.
**/products/newproduct:** Ruta para crear un nuevo producto los cuales tienen la siguiente estructura:

 -  productData = {
   category_id: 1,
   productname: "Producto de prueba",
   price: 10000,
   stock: 10,
   garantia: "1 año",
   description: "Descripción del producto de prueba",
   image: "imagen.png",
 };

## Favoritos
**/fav/getfav/:userId:** Ruta para obtener los favoritos de un usuario, se pasa por parametro el id del usuario.
**/fav/addToFav/:userId:** Ruta para agregar un producto a favoritos, se pasa por parametro el id del usuario y en el body el id del producto.
**/fav/deleteFav/:userId:** Ruta para eliminar un producto de favoritos, se pasa por parametro el id del usuario y en el body el id del producto.

## Carro de compras
**/cart/getCart/:userId:** Ruta para obtener el carro de compras de un usuario, se pasa por parametro el id del usuario que se foguea.
**/cart/addToCart/:userId:** Ruta para agregar un producto al carro, se pasa por parametro el id del usuario y en el body se pasa el id del producto y la cantidad.
**/cart/deleteProduct/:userId:** Ruta para eliminar producto del carro de compras, se le pasa por parametro el id del usuario y en el body el id del producto.

## Rutas publicas

 - /users/register
 - /users/login
 - /products/allproducts
 

## Rutas protegidas

 - /products/newproduct
 - /fav/getfav/:userId
 - /fav/addToFav/:userId
 - /fav/deleteFav/:userId
 - /cart/getCart/:userId
 - /cart/addToCart/:userId
 - /cart/deleteProduct/:userId

