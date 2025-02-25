import BookList from "@/components/BookList";
import Header from "@/components/Header";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <BookList />
    </div>
  );
}
