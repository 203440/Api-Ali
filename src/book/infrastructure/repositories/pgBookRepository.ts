import pool from '../database/pgDatabase';
import { Book } from '../../domain/models/book';
import { BookRepository } from '../../domain/repositories/bookRepository';

export class PgBookRepository implements BookRepository {

  async findById(id: string): Promise<Book | null> {

    const client = await pool.connect();
    try {
      const query = 'SELECT * FROM books WHERE id = $1';
      const result = await client.query(query, [id]);

      if (result.rowCount === 0) {
        return null;
      }

      const bookData = result.rows[0];
      const book = new Book(bookData.id, bookData.title, bookData.author, bookData.publicationYear);
      return book;
    } finally {
      client.release();
    }
  }
  
  async findAll(): Promise<Book[]> {
    const client = await pool.connect();
    
    try {
      const result = await client.query('SELECT * FROM books');
      return result.rows;
    } finally {
      client.release();
    }
  }
  async create(book: Book): Promise<void> {
    const client = await pool.connect();
    try {
      const { id, title, author, publicationYear } = book;
      const query = 'INSERT INTO books (id, title, author, publication_year) VALUES ($1, $2, $3, $4)';
      await client.query(query, [id, title, author, publicationYear]);
    } finally {
      client.release();
    }
  }

  async delete(id: string): Promise<void> {
    const client = await pool.connect();
    try {
      await client.query('DELETE FROM books WHERE id = $1', [id]);
    } finally {
      client.release();
    }
  }

  async update(id: string, book: Book): Promise<void> {
    const client = await pool.connect();
    try {
      const query = 'UPDATE books SET title = $1, author = $2, publicationYear = $3 WHERE id = $4';
      const values = [book.getTitle(), book.getAuthor(), book.getPublicationYear(), id];
      await client.query(query, values);
    } finally {
      client.release();
    }
  }

  // Implementa los demás métodos del repositorio de libros
}
