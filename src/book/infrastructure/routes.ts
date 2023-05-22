import { Router } from 'express';
import { BookController } from '../application/controllers/bookController';

export function setupRoutes(router: Router, bookController: BookController): void {
  router.get('/books', bookController.getAllBooks);
  router.post('/newbooks', bookController.createBook);
  router.delete('/books/:id', bookController.deleteBook);
  router.put('/books/:id', bookController.updateBook);
}
