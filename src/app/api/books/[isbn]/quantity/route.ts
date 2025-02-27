import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Book from "@/models/Book";

export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    const pathname = request.nextUrl.pathname;
    const isbn = pathname.split("/")[3];
    if (!isbn) {
      return NextResponse.json(
        { message: "잘못된 요청입니다." },
        { status: 400 }
      );
    }

    const { quantity } = await request.json();
    if (!quantity || isNaN(Number(quantity))) {
      return NextResponse.json(
        { message: "유효하지 않은 수량입니다." },
        { status: 400 }
      );
    }

    const updatedBook = await Book.findOneAndUpdate({ isbn }, { quantity });

    if (!updatedBook) {
      return NextResponse.json(
        { message: "책을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedBook, { status: 200 });
  } catch (error) {
    console.log("수량 수정 오류", error);
    return NextResponse.json({ message: "서버 오류" }, { status: 500 });
  }
}
