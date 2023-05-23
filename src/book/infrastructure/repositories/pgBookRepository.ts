import pool from '../database/pgDatabase';
import { Book } from '../../domain/models/book';
import { BookRepository } from '../../domain/repositories/bookRepository';

export class PgBookRepository implements BookRepository {

  async findById(id: string): Promise<Book | null> {
    const query = 'SELECT * FROM books WHERE id = $1';
    const result = await pool.query(query, [id]);

    if (result.rowCount === 0) {
      return null;
    }

    const bookData = result.rows[0];
    const book = new Book(bookData.id, bookData.title, bookData.author, bookData.publicationYear);
    return book;
  }
  
  async findAll(): Promise<Book[]> {
    const query = 'SELECT * FROM books';
    const result = await pool.query(query);
    return result.rows;
  }

  async create(book: Book): Promise<void> {
    const { id, title, author, publicationYear } = book;
    const query = 'INSERT INTO books (id, title, author, publication_year) VALUES ($1, $2, $3, $4)';
    await pool.query(query, [id, title, author, publicationYear]);
  }

  async delete(id: string): Promise<void> {
    const query = 'DELETE FROM books WHERE id = $1';
    await pool.query(query, [id]);
  }

  async update(id: string, book: Book): Promise<void> {
    const { title, author, publicationYear } = book;
    const query = 'UPDATE books SET title = $1, author = $2, publication_year = $3 WHERE id = $4';
    await pool.query(query, [title, author, publicationYear, id]);
  }
}
