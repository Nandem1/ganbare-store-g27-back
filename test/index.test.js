const request = require("supertest");
const server = require("../index");
const User = require('../src/controllers/userController')
const jwt = require("jsonwebtoken");
require("dotenv").config();

describe("createNewProduct", () => {
  it("Debería crear un nuevo producto y retornar un código de estado 201 con los datos del producto", async () => {
    const productData = {
      category_id: 1,
      productname: "Producto de prueba",
      price: 10000,
      stock: 10,
      garantia: "1 año",
      description: "Descripción del producto de prueba",
      image: "imagen.png",
    };

    const newUser = {
      userEmail: 'admin2@gmail.com',
      userAddress: 'Calle de prueba ',
      password: 'password123',
      profile_id: 1,
      city_id: 1,
      userRut: '123456789',
      userPhone: '987654321',
    };

    const user = {
      userEmail: "admin@gmail.com",
      password: 'password123',
    };
    await request(server).post('/users/register').send(newUser);
    const responseToken = await request(server).post('/users/login').send(user);
    console.log("token en crear producto: ",responseToken.body.token);
    const response = await request(server)
      .post("/products/newproduct")
      .set("Authorization", responseToken.body.token)
      .send(productData);
    console.log("respuesta de crear producto: ",response.body);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(productData);
  });

  it("Debería retornar un código de estado 401 cuando no se proporciona un token", async () => {
    const productData = {};

    const response = await request(server)
      .post("/products/newproduct")
      .send(productData);

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Token de autenticación no proporcionado.",
    });
  });

  it("Debería retornar un código de estado 401 si se proporciona un token inválido", async () => {
    const productData = {
      category_id: 1,
      productname: "Producto de prueba",
      price: 10000,
      stock: 10,
      garantia: "1 año",
      description: "Descripción del producto de prueba",
      image: "imagen.png",
    };

    const invalidToken = "token_invalido";

    const response = await request(server)
      .post("/products/newproduct")
      .set("Authorization", `Bearer ${invalidToken}`)
      .send(productData);

    expect(response.status).toBe(403);
    expect(response.body).toEqual({
      message: "Token de autenticación inválido.",
    });
  });
});

describe("userOperations", () => {
  describe("GET /", () => {
    it("Valida que se entreguen todos los usuarios", async() => {
      const response = await request(server).get("/users");
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body.every(item => typeof item === 'object')).toBe(true);
    });
  });

  describe ("POST /register", () => {
    const newUser = {
      userEmail: 'nuevo_usuario7@gmail.com',//colocar un correo no registrado
      userAddress: 'Calle de prueba 123',
      password: 'password123',
      profile_id: 1,
      city_id: 1,
      userRut: '123456789',
      userPhone: '987654321',
    };
    const existingUser = {
      userEmail: 'nuevo_usuario7@gmail.com',//usar el mismo correo de newUser
      userAddress: 'Calle de prueba 123',
      password: 'password123',
      profile_id: 1,
      city_id: 1,
      userRut: '123456789',
      userPhone: '987654321',
    };
    it("Valida middleware que opere correctamente si el usuario no esta registrado y que se entregue codigo 200", async() => {
      const response = await request(server).post('/users/register').send(newUser);
      expect(response.status).toBe(201);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.length).toBeGreaterThan(0);
    });
    it("Valida middleware retorne status 400 si existe el usuario", async() => {
      const response = await request(server).post('/users/register').send(existingUser);
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("El correo electrónico ya está registrado.");
    })
  });

  describe("POST /login", () => {
    const user = {
      userEmail: 'nuevo_usuario5@gmail.com',
      password: 'password123'
    };
    const badUser = {
      userEmail: 'nuevo_usuario5@gmail.com',
      password: 'password122'
    };
    it("Se chequea login exitoso", async() => {
      const response = await request(server).post('/users/login').send(user);
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      console.log("cuerpo de la respuesta: ",response.body.length)
      expect(response.body.token.length).toBeGreaterThan(0);
    });
    it("Se chequean credenciales invàlidas", async() => {
      const response = await request(server).post('/users/login').send(badUser);
      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.message).toBe("Credenciales inválidas.");
    })
  })
})
