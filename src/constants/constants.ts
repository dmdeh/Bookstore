import { InputFieldProps } from "@/components/ui/InputField";

export const ITEMS_PER_PAGE = 10;

export const INPUT_FIELDS: InputFieldProps[] = [
  { id: "isbn", label: "ISBN", placeholder: "ISBN을 입력하세요" },
  { id: "title", label: "제목", placeholder: "제목을 입력하세요" },
  { id: "author", label: "저자", placeholder: "저자를 입력하세요" },
  { id: "publisher", label: "출판사", placeholder: "출판사를 입력하세요" },
  {
    id: "quantity",
    label: "수량",
    type: "number",
    placeholder: "수량을 입력하세요",
    min: 0,
  },
];

export const TABLE_HEADER = [
  { key: "title", label: "제목" },
  { key: "author", label: "저자" },
  { key: "publisher", label: "출판사" },
  { key: "quantity", label: "수량" },
  { key: "actions", label: "편집" },
];
