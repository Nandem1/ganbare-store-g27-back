const { Pool } = require('pg');
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5433,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  // Evento para verificar si la conexión se establece correctamente
pool.on('connect', () => {
  console.log('Conexión a la base de datos establecida correctamente.');
});

// Manejo de errores de conexión
pool.on('error', (err) => {
  console.error('Error en la conexión a la base de datos:', err.stack);
});


  module.exports = pool;