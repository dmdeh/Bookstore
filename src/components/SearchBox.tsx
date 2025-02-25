import styles from "@/styles/SearchBox.module.css";
import { Search } from "lucide-react";

export default function SearchBox({ placeholder }: { placeholder: string }) {
  return (
    <div className={styles.container}>
      <input className={styles.input} placeholder={placeholder} />
      <Search className={styles.icon} />
    </div>
  );
}
