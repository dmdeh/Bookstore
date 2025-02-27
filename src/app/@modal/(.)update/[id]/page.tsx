"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "@/styles/UpdateBook.module.css";
import { fetchBookDetails, updateBook } from "@/lib/data";
import { BookType } from "@/types/type";
import Modal from "@/components/ui/Modal";
import { INPUT_FIELDS } from "@/constants/constants";
import InputField from "@/components/ui/InputField";
import { useBooks } from "@/context/BookContext";

export default function UpdateBook() {
  const router = useRouter();
  const params = useParams();
  const isbn = Array.isArray(params.id) ? params.id[0] : params.id;
  const { refreshBooks } = useBooks();
  const [book, setBook] = useState<BookType>({
    isbn: "",
    title: "",
    author: "",
    publisher: "",
    quantity: "",
  });

  useEffect(() => {
    async function fetchData() {
      if (!isbn) return;
      try {
        const data = await fetchBookDetails(isbn);
        setBook(data);
      } catch (error) {
        console.error("책 정보를 불러오는 중 오류:", error);
      }
    }

    fetchData();
  }, [isbn]);

  if (!isbn) return;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleUpdateBook = async () => {
    await updateBook(isbn, book);
    await refreshBooks();

    router.back();
  };

  return (
    <Modal>
      <div className={styles.overlay} onClick={() => router.back()}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <div className={styles.modalHeader}>
            <h2 className={styles.modalTitle}>책 수정</h2>
          </div>
          <div className={styles.form}>
            {INPUT_FIELDS.map((field) => (
              <InputField
                key={field.id}
                id={field.id}
                label={field.label}
                type={field.type}
                placeholder={field.placeholder}
                min={field.min}
                required={field.required}
                value={book[field.id]}
                onChange={handleChange}
              />
            ))}
            <div className={styles.button}>
              <button
                type="submit"
                className={styles.submitButton}
                onClick={handleUpdateBook}
              >
                저장
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
