"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import styles from "@/styles/Pagination.module.css";
import { generatePagination } from "@/utils/generatePagination";
import { Suspense } from "react";
import Pending from "./Pending";

export default function Pagination({ totalPages }: { totalPages: number }) {
  return (
    <Suspense fallback={<Pending />}>
      <PaginationInner totalPages={totalPages} />
    </Suspense>
  );
}

function PaginationInner({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <div className={styles.paginationContainer}>
      <PaginationArrow
        direction="left"
        href={createPageURL(currentPage - 1)}
        isDisabled={currentPage <= 1}
      />

      <div className={styles.pageNumbers}>
        {allPages.map((page, index) => (
          <PaginationNumber
            key={index}
            href={typeof page === "number" ? createPageURL(page) : "#"}
            page={page}
            isActive={currentPage === page}
          />
        ))}
      </div>

      <PaginationArrow
        direction="right"
        href={createPageURL(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
      />
    </div>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
}: {
  page: number | string;
  href: string;
  isActive: boolean;
}) {
  return isActive || page === "..." ? (
    <span className={isActive ? styles.activePage : styles.pageItem}>
      {page}
    </span>
  ) : (
    <Link href={href} className={styles.pageItem}>
      {page}
    </Link>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: "left" | "right";
  isDisabled?: boolean;
}) {
  return (
    <Link
      href={href}
      className={isDisabled ? styles.disabledArrow : styles.arrow}
      aria-disabled={isDisabled}
    >
      {direction === "left" ? "<" : ">"}
    </Link>
  );
}
