import { fetchBooks } from "@/lib/data";
import styles from "@/styles/BookList.module.css";
import { BookType } from "@/types/type";
import Book from "./Book";

const tableHeaders = [
  { key: "title", label: "제목" },
  { key: "author", label: "저자" },
  { key: "publisher", label: "출판사" },
  { key: "quantity", label: "수량" },
  { key: "actions", label: "편집" },
];

export default async function BookList() {
  const books = await fetchBooks();

  return (
    <div className={styles.container}>
      {books.length === 0 ? (
        <div className={styles.emptyState}>등록된 도서가 없습니다.</div>
      ) : (
        <div className={styles.table}>
          <div className={styles.headerRow}>
            {tableHeaders.map((header) => (
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
    </div>
  );
}
