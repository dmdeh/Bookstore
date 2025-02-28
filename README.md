# Bookstore

## 🔗 [서비스 링크](https://bookstore-kes.vercel.app/)

## 서비스 화면

![bookstore](https://github.com/user-attachments/assets/3baf4181-8420-4482-b9ab-f591e549b8d8)

## 기능 개요

- 도서 목록 조회: 등록된 모든 도서를 페이지네이션으로 조회
- 도서 검색: 제목, 저자, 출판사 등으로 도서 검색
- 도서 추가: 새로운 도서 정보를 등록
- 전역 상태 관리: Context API를 활용한 상태 관리 구현

## 기술 스택

- Next.js, React, TypeScript, MongoDB
- **상태 관리**: React Context API
- **스타일링**: CSS Modules

## 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/dmdeh/Bookstore.git

# 종속성 설치
npm install

# 환경변수 추가
# .env 파일에 추가해주세요
MONGO_URI=mongodb+srv://Bookstore:connectbookstore@cluster0.jdhkx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
BASE_URL=http://localhost:3000

# 실행
npm run dev
```
서버가 시작되면 http://localhost:3000 에서 접속할 수 있습니다.

## 주요 구현 내용

### 1. 전역 상태 관리 (Context API)

도서 목록, 페이지네이션, 검색 쿼리 등의 상태를 전역으로 관리하기 위해 React Context API를 구현했습니다.

### 2. 도서 목록 구현

페이지네이션과 검색 기능을 갖춘 도서 목록을 구현했습니다. URL 파라미터를 활용하여 현재 페이지와 검색 쿼리를 관리합니다.

- 검색 및 페이지네이션과 연동된 상태 관리
- Suspense를 사용한 로딩 상태 처리
- 빈 행 처리를 통한 일관된 UI 유지

### 3. 도서 추가, 수정 기능

모달 기반의 도서 추가, 수정 양식을 구현했습니다. 사용자가 도서 정보를 입력, 수정하고 제출하면, 서버에 데이터를 전송하고 도서 목록을 갱신합니다.

## 📂 폴더구조

```
📦 src                  # 프로젝트의 루트 디렉토리
┣ 📂 app                # Next.js의 App Router 기반 페이지와 API 라우트 관리
┃ ┣ 📂 @modal           # 모달을 위한 중첩 레이아웃(Intercepting Routes) 관리
┃ ┃ ┣ 📂 (.)books       # 도서 목록 모달 페이지
┃ ┃ ┣ 📂 (.)create      # 도서 생성 모달 페이지
┃ ┃ ┣ 📂 (.)update      # 도서 수정 모달 페이지
┃ ┣ 📂 api              # API 라우트 핸들러 (예: REST API 엔드포인트)
┃ ┣ 📂 books            # 도서 관련 페이지 및 기능 관리
┃ ┣ 📂 create           # 도서 추가 페이지
┃ ┣ 📂 update           # 도서 수정 페이지
┃ ┣ 📜 favicon.ico
┃ ┣ 📜 globals.css
┃ ┣ 📜 layout.tsx
┃ ┣ 📜 page.module.css
┃ ┗ 📜 page.tsx         # 루트 페이지 (홈 화면)
┣ 📂 components         # 컴포넌트
┃ ┣ 📂 books            # 도서 관련 UI 컴포넌트
┃ ┣ 📂 layout           # 레이아웃 관련 컴포넌트
┃ ┗ 📂 ui               # 공통 UI 컴포넌트
┣ 📂 constants          # 상수 값 관리
┣ 📂 context            # React Context API를 활용한 상태 관리
┣ 📂 hook               # 커스텀 훅
┣ 📂 lib                # API 호출 함수, connectDB 함수
┣ 📂 models             # bookSchema 데이터 모델 정의
┣ 📂 styles             # CSS 스타일
┣ 📂 types              # TypeScript 타입 정의
┗ 📂 utils              # 유틸 함수 (페이징 함수)
```

## API 명세

### 1. 책 목록 조회 `GET /api/books`

- **Parameters**:
  - `page`: 페이지 번호 (기본값 1)
  - `query`: 검색어 (선택사항)
- **응답**: 도서 목록과 전체 페이지 수 반환
  ```json
  { "books": [...],  "totalPages": 5 }
  ```

### 2. 책 추가 `POST /api/books`

- **Body**:

  ```json
  {
    "isbn": "9788988474728",
    "title": "책 제목",
    "author": "저자",
    "publisher": "출판사",
    "quantity": "10"
  }
  ```

- **응답**: 추가된 도서 정보

### 3. 책 상세 조회 `GET /api/books/:id`

- **응답**: 해당 ISBN의 도서 상세 정보

### 4. 책 정보 수정 `PUT /api/books/:id`

- **Body**:

  ```json
  {
    "isbn": "9788988474728",
    "title": "수정된 제목",
    "author": "수정된 저자",
    "publisher": "수정된 출판사",
    "quantity": "15"
  }
  ```

- **응답**: 수정된 도서 정보

### 5. 책 수량 수정

- **Body**: `{ "quantity": "20" }`
- **응답**: 수량이 수정된 도서 정보

### 6. 책 삭제 `DELETE /api/books/:id`

- **응답**: 삭제 성공 메시지

## 요구사항

### 📄 책 목록 페이지

- [x] 책 목록을 가져와 10개씩 페이지네이션
- [x] 제목과 저자로 검색 기능 구현

### 📄 책 상세 정보 페이지

- [x] 선택한 책의 상세 정보 표시

### 📄 CRUD 기능

- [x] 책 추가
- [x] 책 삭제
- [x] 책 정보 수정 (제목, 저자, 수량 등)
  - [x] 수량만 수정

### 📌 RESTful API

- [x] 책 목록 조회 `GET /api/books`
- [x] 책 상세 조회 `GET /api/books/:id`
- [x] 책 추가 `POST /api/books`
- [x] 책 정보 수정 `PUT /api/books/:id`
- [x] 책 삭제 `DELETE /api/books/:id`
