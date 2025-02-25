import { fetchBooks } from "@/lib/data";
import styles from "@/styles/BookList.module.css";
import { Book } from "@/types/type";
import Link from "next/link";

const tableHeaders = [
  { key: "title", label: "제목" },
  { key: "author", label: "저자" },
  { key: "publisher", label: "출판사" },
  { key: "quantity", label: "수량" },
  { key: "actions", label: "관리" },
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

          {books.map((book: Book) => (
            <div key={book.isbn} className={styles.row}>
              <div className={styles.cell}>
                <Link href={`/books/${book.isbn}`} className={styles.bookTitle}>
                  {book.title}
                </Link>
              </div>
              <div className={styles.cell}>{book.author}</div>
              <div className={styles.cell}>{book.publisher}</div>
              <div className={styles.cell}>
                <span className={styles.quantity}>{book.quantity}</span>
              </div>
              <div className={styles.buttonCell}>
                <button className={styles.editButton}>수정</button>
                <button className={styles.deleteButton}>삭제</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
