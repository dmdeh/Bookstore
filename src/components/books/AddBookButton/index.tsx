import { Plus } from "lucide-react";
import Link from "next/link";
import styles from "./AddBookButton.module.css";

export function AddBookButton() {
  return (
    <Link href="/create" className={styles.container} scroll={false}>
      <span>책 추가하기</span>
      <Plus size={20} />
    </Link>
  );
}
