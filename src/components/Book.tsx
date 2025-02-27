import { useRouter } from "next/navigation";
import { BookType } from "@/types/type";
import styles from "@/styles/Book.module.css";
import Link from "next/link";
import { ChevronUp, ChevronDown, Pencil, Trash2 } from "lucide-react";
import { deleteBook } from "@/lib/data";

interface BookProps {
  book: BookType;
}

export default function Book({ book }: BookProps) {
  const router = useRouter();
  const { isbn, title, author, publisher, quantity } = book;

  const handleEditBook = (isbn: string) => {
    router.push(`/update/${isbn}`, { scroll: false });
  };

  const handleDeleteBook = async (isbn: string) => {
    const isConfirmed = window.confirm("정말로 삭제하시겠습니까?");
    if (!isConfirmed) return;

    await deleteBook(isbn);
    router.refresh();
  };

  return (
    <div key={isbn} className={styles.row}>
      <div className={styles.cell}>
        <Link
          href={`/books/${isbn}`}
          className={styles.bookTitle}
          scroll={false}
        >
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
        <button
          className={styles.editButton}
          onClick={() => handleEditBook(isbn)}
        >
          <Pencil size={18} />
        </button>
        <button
          className={styles.deleteButton}
          onClick={() => handleDeleteBook(isbn)}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
