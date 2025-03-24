# 🏷️ Tag Manager - Frontend Documentation

🚀 **Tag Manager** is a **Next.js-based** application for managing books and tags. It supports **CRUD operations**, **Server-Side Fetching**, and **Debounced Search** for optimal performance.

---

## **🔧 Installation**  

### **1️⃣ Clone the Repository**  
```bash
git clone https://github.com/username/tag-manager.git
cd tag-manager
```

### **2️⃣ Install Dependencies**  
```bash
yarn install
# or
npm install
```

### **3️⃣ Configure Environment Variables**  
Create a `.env.local` file and add the following:  
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### **4️⃣ Start the Development Server**  
```bash
yarn dev
# or
npm run dev
```

---

## **📂 Project Structure**  
```
/app
  ├── layout.tsx   # Global layout
  ├── /book        # Book pages
      ├── /[id]       # Detail Book pages
          ├── /edit       # Edit Book pages
      ├── add.tsx       # Add Book pages
  ├── /Tag        # Tag pages
      ├── /[id]       # Detail Tag pages
          ├── /edit       # Edit Tag pages
      ├── add.tsx       # Add Tag pages
/components/      # Global UI components
/core/            # API handlers & fetching system
/feature/         # Each feature environment (components, api, constant etc.)
/hooks/           # Global Custom hooks
```

---

## **✨ Features**  
✅ **CRUD operations for Books & Tags**  
✅ **Server-Side Fetching for better SEO**  
✅ **Form Validation using React Hook Form & Yup**  

---

## **📡 API Endpoints**  
| Method  | Endpoint     | Description        |  
|---------|-------------|--------------------|  
| `GET`   | `/tags`     | Fetch all tags     |  
| `POST`  | `/tags`     | Create a new tag   |  
| `PUT`   | `/tags/:id` | Update a tag       |  
| `DELETE`| `/tags/:id` | Delete a tag       |  
| `GET`   | `/books`    | Fetch all books    |  
| `POST`  | `/books`    | Create a new book  |  

---

## **⚡ Fetching Data (Server-Side Rendering - SSR)**  
Example of **fetching books using Server Components**:  
```tsx
export default async function BookPage() {
  const books = await getBooks();
  return (
    <div>
      <h1>Book List</h1>
      <ul>{books.map((book) => <li key={book._id}>{book.title}</li>)}</ul>
    </div>
  );
}
```
✅ **Why use SSR?** Faster loading, no client-side loading states, and better SEO.  

---

## **🛠 Server Functions & Server Components**

### **🔹 What are Server Components?**
Server Components in Next.js **execute on the server** and send **pre-rendered HTML** to the client. They improve **performance, SEO, and reduce JavaScript size** on the client.

✅ **Benefits:**
- **Faster load times** (no client-side fetching needed)
- **Better SEO** (pre-rendered content is indexed by search engines)
- **Reduces JavaScript bundle size**

📌 **Example of a Server Component Fetching Data:**
```tsx
export default async function BookListPage() {
  const books = await getBooks();
  return (
    <div>
      <h1>Books</h1>
      <ul>
        {books.map((book) => (
          <li key={book._id}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

### **🔹 What are Server Functions?**
Server Functions (also called **Server Actions**) allow you to **call API logic directly on the server** without exposing it to the client.

✅ **Benefits:**
- **Secure** (Logic is never exposed in client-side JavaScript)
- **Reduces unnecessary API calls**
- **Simplifies data fetching & form submission**

📌 **Example of a Server Function to Create a Book:**
```tsx
"use server";
import { apiPost } from "@/core/api";

export async function createBook(data) {
  return apiPost("/books", { data });
}
```

✅ **How to Use This Function in a Client Component:**
```tsx
"use client";
import { createBook } from "@/core/api";

export default function AddBookPage() {
  async function handleSubmit(data) {
    await createBook(data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Book Title" />
      <button type="submit">Save</button>
    </form>
  );
}
```

---

## **🛠 Best Practices**  
- Use **Server Actions** for critical data fetching.  
- Validate forms with **React Hook Form & Yup**.  

---
