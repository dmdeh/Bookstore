import { AddBook } from "./Buttons";
import SearchBox from "./SearchBox";
import styles from "@/styles/Header.module.css";

export default function Header() {
  return (
    <header className={styles.container}>
      <SearchBox placeholder="검색어를 입력하세요" />
      <AddBook />
    </header>
  );
}
