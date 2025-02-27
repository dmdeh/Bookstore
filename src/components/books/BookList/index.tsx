"use client";

import styles from "./BookList.module.css";
import { BookType } from "@/types/type";
import Book from "@/components/books/Book";
import Pagination from "@/components/ui/Pagination";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { ITEMS_PER_PAGE, TABLE_HEADER } from "@/constants/constants";
import Pending from "@/components/layout/Pending";
import { useBooks } from "@/context/BookContext";

export default function BookList() {
  return (
    <Suspense fallback={<Pending />}>
      <BookListInner />
    </Suspense>
  );
}

function BookListInner() {
  const searchParams = useSearchParams();
  const pageParam = Number(searchParams.get("page")) || 1;
  const queryParam = searchParams.get("query") || "";

  const { books, totalPages, isPending, setCurrentPage, setQuery } = useBooks();

  useEffect(() => {
    setCurrentPage(pageParam);
    setQuery(queryParam);
  }, [pageParam, queryParam, setCurrentPage, setQuery]);

  const renderEmptyRows = () => {
    const emptyRowsCount = ITEMS_PER_PAGE - books.length;

    return [...Array(emptyRowsCount)].map((_, index) => (
      <div key={`empty-${index}`} className={styles.emptyRow}>
        <div className={styles.emptyCell} />
      </div>
    ));
  };

  return (
    <div className={styles.container}>
      <div className={styles.tableContainer}>
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
            {renderEmptyRows()}
          </div>
        )}
      </div>
      <Pagination totalPages={totalPages} />
    </div>
  );
}
