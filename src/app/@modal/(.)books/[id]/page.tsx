"use client";

import { useParams, useRouter } from "next/navigation";
import styles from "@/styles/BookDetails.module.css";
import Modal from "@/components/Modal";
import { useEffect, useState } from "react";
import { fetchBookDetails } from "@/lib/data";
import { BookType } from "@/types/type";
import Pending from "@/components/Pending";
import { X } from "lucide-react";

export default function BookDetails() {
  const router = useRouter();
  const params = useParams();

  const [book, setBook] = useState<BookType>();
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const getBookDetails = async () => {
      try {
        setIsPending(true);
        const isbn = Array.isArray(params.id) ? params.id[0] : params.id;

        if (!isbn) {
          throw new Error("ISBN이 제공되지 않았습니다");
        }

        const bookData = await fetchBookDetails(isbn);
        setBook(bookData);
      } catch (error) {
        console.error("책 상세정보를 가져오는 중 오류 발생:", error);
      } finally {
        setIsPending(false);
      }
    };

    getBookDetails();
  }, [params.id]);

  return (
    <Modal>
      <div className={styles.overlay} onClick={() => router.back()}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <div className={styles.modalHeader}>
            {book ? <h2 className={styles.modalTitle}>{book.title}</h2> : <></>}
            <button
              className={styles.closeButton}
              onClick={() => router.back()}
            >
              <X />
            </button>
          </div>
          {isPending ? (
            <Pending />
          ) : book ? (
            <div className={styles.bookInfo}>
              <p className={styles.attribute}>저자: {book.author}</p>
              <p className={styles.attribute}>출판사: {book.publisher}</p>
              <p className={styles.attribute}>ISBN: {book.isbn}</p>
              <p className={styles.attribute}>수량: {book.quantity}</p>
            </div>
          ) : (
            <p>책 정보가 없습니다.</p>
          )}
        </div>
      </div>
    </Modal>
  );
}
