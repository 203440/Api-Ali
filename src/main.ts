import express from 'express';
import { setupRoutes } from './book/infrastructure/routes';
import { BookController } from './book/application/controllers/bookController';
import { BookService } from './book/application/services/bookService';
import { PgBookRepository } from './book/infrastructure/repositories/pgBookRepository';

const app = express();
const router = express.Router();

// Crea las instancias de los componentes
const bookRepository = new PgBookRepository();
const bookService = new BookService(bookRepository);
const bookController = new BookController(bookService);

// Configura las rutas
setupRoutes(router, bookController);

// Agrega el enrutador a la aplicación Express
app.use('/api', router);

// Inicia el servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});


