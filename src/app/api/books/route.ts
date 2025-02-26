import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Book from "@/models/Book";

export async function GET() {
  try {
    await connectDB();
    const books = await Book.find();
    return NextResponse.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const bookData = await request.json();
    if (!bookData.isbn || !bookData.title || !bookData.author) {
      return NextResponse.json(
        { error: "ISBN, 제목, 저자는 필수 입력 항목입니다." },
        { status: 400 }
      );
    }
    const existingBook = await Book.findOne({ isbn: bookData.isbn });
    if (existingBook) {
      return NextResponse.json(
        { error: "이미 등록된 ISBN입니다." },
        { status: 409 }
      );
    }

    if (bookData.quantity === undefined) {
      bookData.quantity = 1;
    }

    const newBook = await Book.create(bookData);

    return NextResponse.json(newBook, { status: 201 });
  } catch (error) {
    console.error("Error creating book:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
