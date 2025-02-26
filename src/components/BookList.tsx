"use client";

import { fetchBooks } from "@/lib/data";
import styles from "@/styles/BookList.module.css";
import { BookType } from "@/types/type";
import Book from "./Book";
import Pagination from "./Pagination";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { TABLE_HEADER } from "@/constants/constants";
import Pending from "./Pending";

export default function BookList() {
  return (
    <Suspense fallback={<Pending />}>
      <BookListInner />
    </Suspense>
  );
}

function BookListInner() {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const query = searchParams.get("query") || "";

  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    async function loadBooks() {
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
    }

    loadBooks();
  }, [currentPage, query]);

  return (
    <div className={styles.container}>
      {isPending ? (
        <Pending />
      ) : books.length === 0 ? (
        <div className={styles.emptyState}>등록된 도서가 없습니다.</div>
      ) : (
        <div className={styles.table}>
          <div className={styles.headerRow}>
            {TABLE_HEADER.map((header) => (
              <div key={header.key} className={styles.headerCell}>
                {header.label}
              </div>
            ))}
          </div>

          {books.map((book: BookType) => (
            <Book key={book.isbn} book={book} />
          ))}
        </div>
      )}
      <Pagination totalPages={totalPages} />
    </div>
  );
}
