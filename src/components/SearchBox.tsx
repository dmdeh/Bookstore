"use client";

import styles from "@/styles/SearchBox.module.css";
import { Search } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Suspense } from "react";
import Pending from "./Pending";

export default function SearchBox({ placeholder }: { placeholder: string }) {
  return (
    <Suspense fallback={<Pending />}>
      <SearchBoxInner placeholder={placeholder} />
    </Suspense>
  );
}

function SearchBoxInner({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      <Search className={styles.icon} />
    </div>
  );
}
