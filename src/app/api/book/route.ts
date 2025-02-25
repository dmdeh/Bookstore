import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Book from "@/models/Book";

export async function GET() {
  await connectDB();
  const books = await Book.find();
  return NextResponse.json(books);
}
