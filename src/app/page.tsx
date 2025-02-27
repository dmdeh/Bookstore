import Header from "@/components/layout/Header";
import styles from "./page.module.css";
import BookList from "@/components/books/BookList";

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <BookList />
    </div>
  );
}
