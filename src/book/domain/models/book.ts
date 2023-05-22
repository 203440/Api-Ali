export class Book {
    public id: string;
    public title: string;
    public author: string;
    public publicationYear: number;
  
    constructor(id: string, title: string, author: string, publicationYear: number) {
      this.id = id;
      this.title = title;
      this.author = author;
      this.publicationYear = publicationYear;
    }
    getId(): string {
      return this.id;
    }
  
    getTitle(): string {
      return this.title;
    }
  
    setTitle(title: string): void {
      this.title = title;
    }
  
    getAuthor(): string {
      return this.author;
    }
  
    setAuthor(author: string): void {
      this.author = author;
    }
  
    getPublicationYear(): number {
      return this.publicationYear;
    }
  
    setPublicationYear(publicationYear: number): void {
      this.publicationYear = publicationYear;
    }
  }