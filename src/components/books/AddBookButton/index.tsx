"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import styles from "./AddBookButton.module.css";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Pending from "@/components/layout/Pending";

export function AddBookButton() {
  return (
    <Suspense fallback={<Pending />}>
      <AddBookButtonInner />
    </Suspense>
  );
}

function AddBookButtonInner() {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") || "1";

  return (
    <Link
      href={`/create/?page=${currentPage}`}
      className={styles.container}
      scroll={false}
    >
      <span>책 추가하기</span>
      <Plus size={20} />
    </Link>
  );
}
