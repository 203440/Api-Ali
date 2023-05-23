import { Client } from 'pg';
import dbConfig from './dbConfig';

const client = new Client(dbConfig);

// Conexión a la base de datos
client.connect()
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });

export default client;