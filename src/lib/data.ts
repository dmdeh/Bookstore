import { BookType } from "@/types/type";

const baseUrl = process.env.BASE_URL || "";

export async function fetchBooks(page = 1, query = "") {
  try {
    const url = `${baseUrl}/api/books?page=${page}${
      query ? `&query=${query}` : ""
    }`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("책 정보를 가져오는데 실패했습니다");
    }

    return res.json();
  } catch (error) {
    console.error("책 목록을 가져오는 중 오류 발생:", error);
    return { books: [], totalPages: 0 };
  }
}

export async function createBook(bookData: BookType) {
  try {
    const res = await fetch(`${baseUrl}/api/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "책 추가에 실패했습니다.");
    }

    return await res.json();
  } catch (error) {
    console.error("책 추가 중 오류 발생:", error);
    throw error;
  }
}

export async function fetchBookDetails(isbn: string) {
  try {
    const res = await fetch(`/api/books/${isbn}`);

    if (!res.ok) {
      throw new Error(
        `책 상세정보를 불러오는 데 실패했습니다. (status: ${res.status})`
      );
    }

    return await res.json();
  } catch (error) {
    console.error("책 상세 정보를 가져오는 중 오류 발생:", error);
    throw error;
  }
}
