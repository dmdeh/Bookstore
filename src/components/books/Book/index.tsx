import { useRouter, useSearchParams } from "next/navigation";
import { BookType } from "@/types/type";
import styles from "./Book.module.css";
import Link from "next/link";
import { ChevronUp, ChevronDown, Pencil, Trash2 } from "lucide-react";
import { deleteBook, updateBookQuantity } from "@/lib/data";
import { useEffect, useState } from "react";
import useDebounce from "@/hook/useDebounce";

interface BookProps {
  book: BookType;
}

export default function Book({ book }: BookProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") || "1";

  const { isbn, title, author, publisher, quantity } = book;
  const [newQuantity, setNewQuantity] = useState(quantity);

  const handleEditQuantity = async (operation: "increase" | "decrease") => {
    setNewQuantity((prevQuantity: string) => {
      const number = +prevQuantity;
      const nextQuantity = operation === "increase" ? number + 1 : number - 1;
      return nextQuantity >= 0 ? nextQuantity.toString() : "0";
    });
  };

  const debouncedQuantity = useDebounce(newQuantity, 1000);

  useEffect(() => {
    const updateQuantity = async () => {
      try {
        await updateBookQuantity(isbn, debouncedQuantity);
      } catch (error) {
        console.error("책 정보 업데이트 중 오류 발생:", error);
      }
    };

    if (newQuantity !== quantity) {
      updateQuantity();
    }
  }, [isbn, debouncedQuantity]);

  const handleEditBook = (isbn: string) => {
    router.push(`/update/${isbn}?page=${currentPage}`, { scroll: false });
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
        <span
          className={`${styles.quantity} ${
            +quantity <= 1 ? styles.lowStock : ""
          }`}
        >
          {newQuantity}
        </span>
        <div className={styles.editQuantity}>
          <ChevronUp size={17} onClick={() => handleEditQuantity("increase")} />
          <ChevronDown
            size={17}
            onClick={() => handleEditQuantity("decrease")}
          />
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
