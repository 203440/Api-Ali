import { Book } from '../models/book';

export interface BookRepository {
  findAll(): Promise<Book[]>;
  findById(id: string): Promise<Book | null>;
  create(book: Book): Promise<void>;
  update(id: string, book: Book): Promise<void>;
  delete(id: string): Promise<void>;
}
