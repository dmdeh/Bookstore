"use client";

import { useRouter } from "next/navigation";
import styles from "@/styles/Create.module.css";
import { createBook } from "@/lib/data";
import Modal from "@/components/Modal";
import InputField from "@/components/InputField";
import { INPUT_FIELDS } from "@/constants/constants";

export default function CreateBook() {
  const router = useRouter();

  const handelSubmitBook = async (formData: FormData) => {
    const isbn = formData.get("isbn")?.toString().trim() ?? "";
    const title = formData.get("title")?.toString().trim() ?? "";
    const author = formData.get("author")?.toString().trim() ?? "";
    const publisher = formData.get("publisher")?.toString().trim() ?? "";
    const quantity = formData.get("quantity")?.toString().trim() ?? "";

    await createBook({ isbn, title, author, publisher, quantity });

    router.back();
  };
  return (
    <Modal>
      <div className={styles.overlay} onClick={() => router.back()}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <div className={styles.modalHeader}>
            <h2 className={styles.modalTitle}>책 추가</h2>
          </div>
          <form action={handelSubmitBook} className={styles.form}>
            {INPUT_FIELDS.map((field) => (
              <InputField
                key={field.id}
                id={field.id}
                label={field.label}
                type={field.type}
                placeholder={field.placeholder}
                min={field.min}
                required={field.required}
              />
            ))}
            <div className={styles.buttonGroup}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => router.back()}
              >
                취소
              </button>
              <button type="submit" className={styles.submitButton}>
                추가
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}
