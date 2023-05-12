# Lolo's Reads

Book review app, named in honour of my book-loving wife Lolo. Designed to let you capture, track and manage your thoughts on all the books you've read - all in one place! And uses the Google Books API so book cover images get pulled in automatically.

Showcases my ability to build a modern full-stack react app with serverless functions, connecting to MongoDB and handling CRUD operations.

**Tech used:** React, Next.js, React Hook Form, Material UI, Axios, TanStack Query, Redux, MongoDB, Google Books API, Serverless functions.

## How to run

1. Install dependencies by running 

```bash
pnpm install
```

2. Set up environment variables by creating .env file in root directory, and putting in the following variables

```bash
NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY="your.google.books.api.key"
DB_URL="your.mongodb.connection.url"
```

3. Run in dev, by running the below command, and open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


```bash
pnpm dev
```

## Deploy on Vercel

The easiest way to deploy the app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
