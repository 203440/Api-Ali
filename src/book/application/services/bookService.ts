import { Book } from '../../domain/models/book';
import { BookRepository } from '../../domain/repositories/bookRepository';

export class BookService {
  constructor(private readonly bookRepository: BookRepository) {}

  async getAllBooks(): Promise<Book[]> {
    return this.bookRepository.findAll();
  }

  async createBook(book: Book): Promise<void> {
    await this.bookRepository.create(book);
  }

  async deleteBook(id: string): Promise<void> {
    const book = await this.bookRepository.findById(id);
    if (!book) {
      throw new Error('not found');
    }
    await this.bookRepository.delete(id);
  }

  async updateBook(id: string, bookData: Partial<Book>): Promise<void> {
    const book = await this.bookRepository.findById(id);
    if (!book) {
      throw new Error('not found');
    }

    const updatedBook = new Book(
      book.getId(),
      bookData.title || book.getTitle(),
      bookData.author || book.getAuthor(),
      bookData.publicationYear || book.getPublicationYear()
    );

    await this.bookRepository.update(id, updatedBook);
  }
}
