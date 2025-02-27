"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { fetchBooks } from "@/lib/data";
import { BookContextType, BookType } from "@/types/type";

const BookContext = createContext<BookContextType | undefined>(undefined);

export function BookProvider({ children }: { children: ReactNode }) {
  const [books, setBooks] = useState<BookType[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [isPending, setIsPending] = useState(true);

  const refreshBooks = async () => {
    setIsPending(true);
    try {
      const data = await fetchBooks(currentPage, query);
      setBooks(data.books);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("책 목록을 가져오는 중 오류 발생:", error);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    refreshBooks();
  }, [currentPage, query]);

  return (
    <BookContext.Provider
      value={{
        books,
        totalPages,
        currentPage,
        query,
        isPending,
        setCurrentPage,
        setQuery,
        refreshBooks,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}

export function useBooks() {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error("useBooks must be used within a BookProvider");
  }
  return context;
}
