import { BookType } from "@/types/type";
import styles from "@/styles/Book.module.css";
import Link from "next/link";
import { ChevronUp, ChevronDown, Pencil, Trash2 } from "lucide-react";

interface BookProps {
  book: BookType;
}

export default function Book({ book }: BookProps) {
  const { isbn, title, author, publisher, quantity } = book;

  return (
    <div key={isbn} className={styles.row}>
      <div className={styles.cell}>
        <Link href={`/books/${isbn}`} className={styles.bookTitle}>
          {title}
        </Link>
      </div>
      <div className={styles.cell}>{author}</div>
      <div className={styles.cell}>{publisher}</div>
      <div className={styles.quantityCell}>
        <span className={styles.quantity}>{quantity}</span>
        <div className={styles.editQuantity}>
          <ChevronUp size={17} />
          <ChevronDown size={17} />
        </div>
      </div>
      <div className={styles.buttonCell}>
        <button className={styles.editButton}>
          <Pencil size={18} />
        </button>
        <button className={styles.deleteButton}>
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
