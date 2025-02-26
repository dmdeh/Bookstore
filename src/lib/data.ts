import { BookType } from "@/types/type";

const baseUrl = process.env.BASE_URL || "";

export async function fetchBooks() {
  try {
    const res = await fetch(`${baseUrl}/api/books`);

    if (!res.ok) {
      throw new Error("책 정보를 가져오는데 실패했습니다");
    }

    return res.json();
  } catch (error) {
    console.error("책 목록을 가져오는 중 오류 발생:", error);
    return [];
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
