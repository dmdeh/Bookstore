import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Book from "@/models/Book";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const pathname = request.nextUrl.pathname;
    const isbn = pathname.split("/").pop();

    if (!isbn) {
      return NextResponse.json(
        { message: "잘못된 요청입니다." },
        { status: 400 }
      );
    }

    const book = await Book.findOne({ isbn });

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

export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    const pathname = request.nextUrl.pathname;
    const isbn = pathname.split("/").pop();
    if (!isbn) {
      return NextResponse.json(
        { message: "잘못된 요청입니다." },
        { status: 400 }
      );
    }

    const bookData = await request.json();
    if (!bookData) {
      return NextResponse.json(
        { message: "유효하지 않은 데이터입니다." },
        { status: 400 }
      );
    }

    const updatedBook = await Book.findOneAndUpdate({ isbn }, bookData);

    if (!updatedBook) {
      return NextResponse.json(
        { message: "책을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedBook, { status: 200 });
  } catch (error) {
    console.log("책 정보 수정 오류", error);
    return NextResponse.json({ message: "서버 오류" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectDB();

    const pathname = request.nextUrl.pathname;
    const isbn = pathname.split("/").pop();

    if (!isbn) {
      return NextResponse.json(
        { message: "잘못된 요청입니다." },
        { status: 400 }
      );
    }

    const deletedBook = await Book.findOneAndDelete({ isbn });
    if (!deletedBook) {
      return NextResponse.json(
        { message: "책을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "책이 삭제되었습니다." },
      { status: 200 }
    );
  } catch (error) {
    console.log("책 삭제 오류", error);
    return NextResponse.json({ message: "서버 오류" }, { status: 500 });
  }
}
