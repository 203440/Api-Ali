import { Request, Response } from 'express';
import { BookService } from '../services/bookService';
import { Book } from '../../domain/models/book';

export class BookController {
  constructor(private readonly bookService: BookService) {}

  async getAllBooks(req: Request, res: Response): Promise<void> {
    try {
      const books = await this.bookService.getAllBooks();
      res.json(books);
    } catch (error) {
      res.status(500).json({ error: 'Error' });
    }
  }

  async createBook(req: Request, res: Response): Promise<void> {
    try {
      const { id, title, author, publicationYear } = req.body;
      const book = new Book(id, title, author, publicationYear);
      this.bookService.createBook(book);
      res.status(201).json({ message: 'Libro agregado' });
    } catch (error) {
      res.status(500).json({ error: 'Error' });
    }
  }

  async deleteBook(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      this.bookService.deleteBook(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error' });
    }
  }

  async updateBook(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const bookData = req.body;

    try {
      await this.bookService.updateBook(id, bookData);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error' });
    }
  }

}
