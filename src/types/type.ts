export interface BookType {
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  quantity: string;
}

export type Fields = keyof BookType;
