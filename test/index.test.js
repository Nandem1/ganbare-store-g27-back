const request = require("supertest");
const server = require("../index");
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

    const user = {
      id: 123,
      name: "Nombre del Usuario",
      role: "administrador"
    };

    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "30s" });

    const response = await request(server)
      .post("/products/newproduct")
      .set("Authorization", `Bearer ${token}`)
      .send(productData);

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
