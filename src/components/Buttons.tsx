import { Plus } from "lucide-react";
import Link from "next/link";
import styles from "@/styles/Buttons.module.css";

export function AddBook() {
  return (
    <Link href="/create" className={styles.container}>
      <span>책 추가하기</span>
      <Plus size={20} />
    </Link>
  );
}
