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
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async createBook(req: Request, res: Response): Promise<void> {
    try {
      const { id, title, author, publicationYear } = req.body;
      const book = new Book(id, title, author, publicationYear);
      await this.bookService.createBook(book);
      res.status(201).json({ message: 'Book created' });
    } catch (error) {
      res.status(400).json({ error: 'Bad request' });
    }
  }

  async deleteBook(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      await this.bookService.deleteBook(id);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: 'Book not found' });
    }
  }

  async updateBook(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const bookData = req.body;

    try {
      await this.bookService.updateBook(id, bookData);
      res.status(200).json({ message: 'Book updated' });
    } catch (error) {
      res.status(400).json({ error: 'Bad request' });
    }
  }
}
