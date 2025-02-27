export interface BookType {
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  quantity: string;
}

export interface BookContextType {
  books: BookType[];
  totalPages: number;
  currentPage: number;
  query: string;
  isPending: boolean;
  setCurrentPage: (page: number) => void;
  setQuery: (query: string) => void;
  refreshBooks: () => Promise<void>;
}

export type Fields = keyof BookType;
