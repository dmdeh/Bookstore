import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Book from "@/models/Book";

export async function GET(
  request: NextRequest,
  { params }: { params: { isbn: string } }
) {
  try {
    await connectDB();

    const book = await Book.findOne({ isbn: params.isbn });

    if (!book) {
      return NextResponse.json(
        { message: "책을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json(book, { status: 200 });
  } catch (error) {
    console.error("책 상세 조회 오류:", error);
    return NextResponse.json({ message: "서버 오류" }, { status: 500 });
  }
}
