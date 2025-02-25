export async function fetchBooks() {
  try {
    const baseUrl = process.env.BASE_URL || "";
    const res = await fetch(`${baseUrl}/api/book`);

    if (!res.ok) {
      throw new Error("책 정보를 가져오는데 실패했습니다");
    }

    return res.json();
  } catch (error) {
    console.error("책 목록을 가져오는 중 오류 발생:", error);
    return [];
  }
}
