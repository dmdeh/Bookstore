import { AddBookButton } from "@/components/books/AddBookButton";
import SearchBox from "@/components/ui/SearchBox";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.container}>
      <SearchBox placeholder="검색어를 입력하세요" />
      <AddBookButton />
    </header>
  );
}
