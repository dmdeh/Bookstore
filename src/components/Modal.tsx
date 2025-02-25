import styles from "@/styles/Modal.module.css";

export default function Modal({ children }: { children: React.ReactNode }) {
  return <div className={styles.container}>{children}</div>;
}
